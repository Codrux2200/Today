import { FastifyReply, FastifyRequest } from 'fastify';
import { Transaction } from '../models/Transaction';
import Coin from '../models/Coin';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Trash from '../models/Trash';
import { Course } from '../models/Course';
import { SpecificCourse } from '../models/Course'; // Import du modèle SpecificCourse



export const markPaymentAsCompletedHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  const { transactionId } = req.body as { transactionId: string };
  const participantId = req.user.id;

  try {
    // --- Vérification de la transaction ---
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return reply.status(404).send({ message: 'Transaction not found' });
    }

    // --- Vérification de la présence du participant ---
    const participant = transaction.participants.find((p) => p.user && p.user.toString() === participantId);
    if (!participant) {
      return reply.status(400).send({ message: 'Participant not found in this transaction' });
    }

    // --- Vérification si le participant a déjà payé ---
    if (participant.status === 'paid') {
      return reply.status(400).send({ message: 'Participant has already paid' });
    }

    // --- Vérification du solde de coins du participant ---
    const myCoin = await getUserCoins(participantId);
    if (myCoin.coinCount < participant.shareAmount) {
      return reply.status(400).send({ message: 'Vous n\'avez pas assez de jetons pour payer' });
    }

    // --- Suppression des coins pour ce participant ---
    let coinsDeleted = 0;
    while (coinsDeleted < participant.shareAmount) {
      const coin = await Coin.findOne({ token: { $exists: true } });
      if (coin) {
        const decodedToken = jwt.verify(coin.token, 'your_jwt_secret') as { id: string; createdAt: string };
        if (decodedToken.id === participantId) {
          await Coin.deleteOne({ _id: coin._id });
          await Trash.create({ token: coin.token });
          coinsDeleted++;
        }
      } else {
        break;
      }
    }

    // --- Vérification si suffisamment de coins ont été supprimés ---
    if (coinsDeleted < participant.shareAmount) {
      // Si le nombre de coins supprimés est insuffisant, restaurer les coins et renvoyer une erreur
      for (let i = 0; i < coinsDeleted; i++) {
        const newToken = jwt.sign({ id: participantId, createdAt: new Date().toISOString() }, 'your_jwt_secret');
        const newCoin = new Coin({ token: newToken });
        await newCoin.save();
      }
      return reply.status(400).send({ message: 'Pas assez de jetons pour supprimer, jetons restaurés sur votre compte' });
    }

    // --- Marquer le participant comme ayant payé ---
    participant.status = 'paid';
    await transaction.save();

    // --- Vérification si tous les participants ont payé ---
    const allPaid = transaction.participants.every((p) => p.status === 'paid');
    if (allPaid) {
      // Si tous les participants ont payé, procéder à la gestion des paiements

      if (!transaction.cours) {
        // --- Si la transaction n'est pas liée à un cours spécifique, transférer à l'utilisateur ---
        const userToPaid = await User.findOne({ _id: transaction.payer });
        if (userToPaid) {
          // Ajouter des coins à l'utilisateur destinataire
          for (let i = 0; i < transaction.totalAmount; i++) {
            const newToken = jwt.sign({ id: transaction.payer, createdAt: new Date().toISOString() }, 'your_jwt_secret');
            const newCoin = new Coin({ token: newToken });
            await newCoin.save();
          }
          await userToPaid.save();
        } else {
          // Si l'utilisateur à qui l'argent doit être envoyé n'existe pas, restaurer les coins supprimés
          for (let i = 0; i < coinsDeleted; i++) {
            const newToken = jwt.sign({ id: participantId, createdAt: new Date().toISOString() }, 'your_jwt_secret');
            const newCoin = new Coin({ token: newToken });
            await newCoin.save();
          }
          return reply.status(400).send({ message: 'Le destinataire de la transaction n\'existe pas' });
        }
      } else {
        // --- Si la transaction est liée à un cours spécifique ---
        const specificCourseToPaid = await SpecificCourse.findOne({ _id: transaction.to }).populate('courseId');
        if (specificCourseToPaid) {
          // Ajouter le participant au cours spécifique
          for (const participant of transaction.participants) {
            specificCourseToPaid.members.push(participant.user as string);
          }

          // Vérification si le cours spécifique est complet
          if (specificCourseToPaid.members.length >= specificCourseToPaid.slots) {
            specificCourseToPaid.status = 'full';
          }

          // Ajouter des coins au créateur du cours
          for (let i = 0; i < transaction.totalAmount; i++) {
            const newToken = jwt.sign({ id: specificCourseToPaid.courseId, createdAt: new Date().toISOString() }, 'your_jwt_secret');
            const newCoin = new Coin({ token: newToken });
            await newCoin.save();
          }

          await specificCourseToPaid.save();
        } else {
          // Si le cours spécifique n'existe pas, restaurer les coins supprimés
          for (let i = 0; i < coinsDeleted; i++) {
            const newToken = jwt.sign({ id: participantId, createdAt: new Date().toISOString() }, 'your_jwt_secret');
            const newCoin = new Coin({ token: newToken });
            await newCoin.save();
          }
          return reply.status(400).send({ message: 'Le cours spécifique de la transaction n\'existe pas' });
        }
      }

      // --- Finaliser la transaction ---
      transaction.status = 'completed';
      await transaction.save();
    }

    reply.status(200).send({
      message: 'Payment completed successfully',
      transaction,
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    reply.status(500).send({ message: 'Server error', error: errorMessage });
  }
};

export const createTransactionHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  const { participants, totalAmount, coinIds, group, cours, to, payer } = req.body as {
    participants: { user: string; shareAmount: number }[];
    totalAmount: number;
    coinIds: string[];
    group: boolean;
    cours: boolean;
    to: string;
    payer: string;
  };

  try {
    if (cours) {
      // Récupération du SpecificCourse à partir de son ID (to)
      const specificCourse = await SpecificCourse.findOne({ _id: to }).populate('courseId'); // Utilisation de populate pour charger le `Course`
      
      if (!specificCourse) {
        return reply.status(400).send({ message: 'Le cours spécifique de la transaction n\'existe pas' });
      }

      // Accéder au `Course` associé via `specificCourse.courseId`
      const course = specificCourse.courseId;

      if (!course) {
        return reply.status(400).send({ message: 'Le cours parent n\'existe pas' });
      }

      // Vérification des conditions du `SpecificCourse`
      if (specificCourse.status === 'full') {
        return reply.status(400).send({ message: 'Le cours spécifique est déjà complet' });
      }

      // Vérification de la validité du nombre de participants (par exemple, vérification par rapport à `course.memberMin` et `course.memberMax`)
      if (participants.length < specificCourse.slots) {
        return reply.status(400).send({ message: 'Le nombre de participants n\'est pas correct pour ce cours' });
      }
    }

    if (group) {
      if (!participants || participants.length === 0) {
        return reply.status(400).send({ message: 'Les participants doivent être spécifiés pour une transaction de groupe' });
      }

      const totalShare = participants.reduce((sum, participant) => sum + participant.shareAmount, 0);

      if (totalShare !== totalAmount) {
        return reply.status(400).send({ message: 'La somme des parts n\'est pas égale au montant total' });
      }
    } else {
      if (participants.length !== 1 || participants[0].user !== payer) {
        return reply.status(400).send({ message: 'Pour une transaction non groupée, seul le payeur peut être répertorié comme participant' });
      }

      if (participants[0].shareAmount !== totalAmount) {
        return reply.status(400).send({ message: 'Pour une transaction non groupée, la part du payeur doit être égale au montant total' });
      }
    }

    const transaction = new Transaction({
      payer,
      participants: participants.map((participant: { user: any; shareAmount: number }) => ({
        user: participant.user,
        shareAmount: participant.shareAmount,
        status: 'pending',
      })),
      totalAmount: totalAmount,
      coinUsed: null,
      to,
      cours,
      group,
    });

    await transaction.save();

    reply.status(201).send({ message: 'Transaction créée avec succès', transaction });

    // Send notifications to users to pay
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    reply.status(500).send({ message: 'Erreur lors de la création de la transaction', error: errorMessage });
  }
};


// Fonction pour obtenir le nombre de coins d'un utilisateur donné
export const getUserCoins = async (participantId: string) => {
  try {
    // Récupère tous les coins de l'utilisateur via son `participantId`
    const coins = await Coin.find();
    
    // Filtrer les coins appartenant à l'utilisateur, basé sur l'ID de l'utilisateur dans le token
    const userCoins = coins.filter((coin) => {
      const decodedToken = jwt.verify(coin.token, 'your_jwt_secret') as { id: string; createdAt: string };
      return decodedToken.id === participantId;
    });
    
    // Retourne le nombre de coins pour l'utilisateur
    const coinCount = userCoins.length;

    return { userId: participantId, coinCount };
  } catch (err) {
    // En cas d'erreur, on retourne 0 coins
    console.error(err);
    return { userId: participantId, coinCount: 0 };
  }
};


