import { FastifyReply, FastifyRequest } from 'fastify';
import { Like } from '../models/Like';
import { Course } from '../models/Course';
import { Review } from '../models/Review';

// Ajouter un like
export const addLikeHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  const { type, itemId } = req.body as {type : string, itemId : string}; // type = 'course' ou 'review', itemId = ID du cours ou de l'avis
  const userId = req.user.id; // ID de l'utilisateur qui effectue l'action
    console.log(type);
  try {
    // Vérifier que le type est valide
    if (!['course', 'review'].includes(type)) {
      return reply.status(400).send({ message: 'Le type doit être "course" ou "review"' });
    }

    // Vérifier si l'élément existe
    if (type === 'course') {
      const course = await Course.findById(itemId);
      if (!course) {
        return reply.status(404).send({ message: 'Le cours n\'existe pas' });
      }
    } else if (type === 'review') {
      const review = await Review.findById(itemId);
      if (!review) {
        return reply.status(404).send({ message: 'L\'avis n\'existe pas' });
      }
    }

    // Vérifier si l'utilisateur a déjà liké cet élément
    const existingLike = await Like.findOne({ userId, itemId, itemType: type });
    if (existingLike) {
      return reply.status(400).send({ message: 'Vous avez déjà liké cet élément' });
    }

    // Créer un nouveau like
    const newLike = new Like({
      userId,
      itemId,
      itemType: type
    });

    await newLike.save();
    reply.status(200).send({ message: 'Like ajouté avec succès' });
  } catch (error : any) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors de l\'ajout du like', error: error.message });
  }
};

// Supprimer un like
export const removeLikeHandler = async (req: FastifyRequest<{ Params: { type: string; itemId: string } }>, reply: FastifyReply) => {
  const { type, itemId } = req.params; // type = 'course' ou 'review', itemId = ID du cours ou de l'avis
  const userId = req.user.id; // ID de l'utilisateur qui effectue l'action

  try {
    // Vérifier que le type est valide
    if (!['course', 'review'].includes(type)) {
      return reply.status(400).send({ message: 'Le type doit être "course" ou "review"' });
    }

    // Vérifier si l'élément existe
    if (type === 'course') {
      const course = await Course.findById(itemId);
      if (!course) {
        return reply.status(404).send({ message: 'Le cours n\'existe pas' });
      }
    } else if (type === 'review') {
      const review = await Review.findById(itemId);
      if (!review) {
        return reply.status(404).send({ message: 'L\'avis n\'existe pas' });
      }
    }

    // Vérifier que l'utilisateur a liké cet élément
    const like = await Like.findOne({ userId, itemId, itemType: type });
    if (!like) {
      return reply.status(400).send({ message: 'Vous n\'avez pas liké cet élément' });
    }

    // Supprimer le like
    await like.deleteOne();
    reply.status(200).send({ message: 'Like retiré avec succès' });
  } catch (error : any) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors de la suppression du like', error: error.message });
  }
};

// Vérifier si un utilisateur a liké un élément
export const checkIfLikedHandler = async (req: FastifyRequest<{ Params: { type: string; itemId: string } }>, reply: FastifyReply) => {
  const { type, itemId } = req.params; // type = 'course' ou 'review', itemId = ID du cours ou de l'avis
  const userId = req.user.id; // ID de l'utilisateur qui effectue l'action

  try {
    // Vérifier que le type est valide
    if (!['course', 'review'].includes(type)) {
      return reply.status(400).send({ message: 'Le type doit être "course" ou "review"' });
    }

    // Vérifier si l'élément existe
    if (type === 'course') {
      const course = await Course.findById(itemId);
      if (!course) {
        return reply.status(404).send({ message: 'Le cours n\'existe pas' });
      }
    } else if (type === 'review') {
      const review = await Review.findById(itemId);
      if (!review) {
        return reply.status(404).send({ message: 'L\'avis n\'existe pas' });
      }
    }

    // Vérifier si l'utilisateur a liké cet élément
    const like = await Like.findOne({ userId, itemId, itemType: type });
    if (like) {
      return reply.status(200).send({ message: 'Vous avez déjà liké cet élément' });
    }

    reply.status(200).send({ message: 'Vous n\'avez pas encore liké cet élément' });
  } catch (error : any) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors de la vérification du like', error: error.message });
  }
};

// Compter le nombre de likes d'un cours ou d'un avis
export const getLikeCountHandler = async (req: FastifyRequest<{ Params: { type: string; itemId: string } }>, reply: FastifyReply) => {
  const { type, itemId } = req.params; // type = 'course' ou 'review', itemId = ID du cours ou de l'avis

  try {
    // Vérifier que le type est valide
    if (!['course', 'review'].includes(type)) {
      return reply.status(400).send({ message: 'Le type doit être "course" ou "review"' });
    }

    // Compter les likes
    const likeCount = await Like.countDocuments({ itemId, itemType: type });
    reply.status(200).send({ likeCount });
  } catch (error : any) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors du comptage des likes', error: error.message });
  }
};
