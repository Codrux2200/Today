// import { FastifyReply, FastifyRequest } from 'fastify';
// import Statconnexion from '../models/Statconnexion';
// import statSeeCourses from '../models/statSeeCourses';
// import Course from '../models/Course';
// import { Transaction } from '../models/Transaction';
// import User from '../models/User';
// import Coin from '../models/Coin';
// import jwt from 'jsonwebtoken';

// interface GetUserStat {
//     userId: string;
// }

// export const getUserStats = async (
//     req: FastifyRequest<{ Querystring: GetUserStat }>,
//     reply: FastifyReply
//   ) => {
//     try {
//       const userId = req.query.userId;
  
//       // Recherche des connexions dans la base de données
//       const results = await Statconnexion.find({ userId }).exec();
//       const courseResults = await statSeeCourses.find({ userId }).exec();
  
//       // Vérification des résultats pour les connexions
//       if (!results || results.length === 0) {
//         console.warn(`Aucune donnée de connexion trouvée pour l'utilisateur : ${userId}`);
//       }
  
//       // Vérification des résultats pour les cours
//       if (!courseResults || courseResults.length === 0) {
//         console.warn(`Aucune donnée de cours trouvée pour l'utilisateur : ${userId}`);
//       }
  
//       // Si aucun des deux types de données n'est disponible
//       if ((!results || results.length === 0) && (!courseResults || courseResults.length === 0)) {
//         return reply.status(404).send({
//           message: 'Aucune donnée trouvée pour cet utilisateur.',
//         });
//       }
  
//       // Transformation des données pour les connexions
//       const cityFrequency: Record<string, number> = {};
//       const dateFrequency: Record<string, number> = {};
  
//       let lastCityConnexion: string | null = null;
//       let lastConnexionDate: string | null = null;
//       let latestCityTimestamp = new Date(0);
  
//       if (results && results.length > 0) {
//         results.forEach((entry) => {
//           const city = entry.data.cityName;
//           const date = new Date(entry.createdAt).toISOString().split('T')[0];
//           const currentTimestamp = new Date(entry.createdAt);
  
//           // Compter les connexions par ville
//           cityFrequency[city] = (cityFrequency[city] || 0) + 1;
  
//           // Compter les connexions par date
//           dateFrequency[date] = (dateFrequency[date] || 0) + 1;
  
//           // Déterminer la dernière ville de connexion et la date
//           if (currentTimestamp > latestCityTimestamp) {
//             latestCityTimestamp = currentTimestamp;
//             lastCityConnexion = city;
//             lastConnexionDate = currentTimestamp.toISOString();
//           }
//         });
//       }
  
//       // Ville la plus fréquente
//       const mostFrequentCity = Object.keys(cityFrequency).reduce((a, b) =>
//         cityFrequency[a] > cityFrequency[b] ? a : b
//       );
  
//       // Transformation des données pour les cours
//       const courseFrequency: Record<string, number> = {};
//       let lastVisitedCourse: string | null = null;
//       let lastVisitedCourseDate: string | null = null;
//       let latestCourseTimestamp = new Date(0);
  
//       if (courseResults && courseResults.length > 0) {
//         courseResults.forEach((entry) => {
//           const courseId = entry.courseId;
//           const currentTimestamp = new Date(entry.createdAt);
  
//           // Compter les visites par cours
//           courseFrequency[courseId] = (courseFrequency[courseId] || 0) + 1;
  
//           // Déterminer le dernier cours visité
//           if (currentTimestamp > latestCourseTimestamp) {
//             latestCourseTimestamp = currentTimestamp;
//             lastVisitedCourse = courseId;
//             lastVisitedCourseDate = currentTimestamp.toISOString();
//           }
//         });
//       }
  
//       // Cours le plus visité
//       const mostVisitedCourse =
//         Object.keys(courseFrequency).length > 0
//           ? Object.keys(courseFrequency).reduce((a, b) =>
//               courseFrequency[a] > courseFrequency[b] ? a : b
//             )
//           : null;
  
//       // Construire la réponse finale
//       const response = {
//         userId,
//         mostFrequentCity: results.length > 0 && mostFrequentCity ? {
//           city: mostFrequentCity,
//           frequency: cityFrequency[mostFrequentCity],
//         } : null,
//         connectionFrequencyByDate: results.length > 0 ? dateFrequency : null,
//         lastConnexion: results.length > 0 && lastCityConnexion && lastConnexionDate ? {
//           city: lastCityConnexion,
//           date: lastConnexionDate,
//         } : null,
//         courseStats: courseResults.length > 0 ? {
//           mostVisitedCourse: mostVisitedCourse ? {
//             courseId: mostVisitedCourse,
//             frequency: courseFrequency[mostVisitedCourse],
//           } : null,
//           lastVisitedCourse: lastVisitedCourse ? {
//             courseId: lastVisitedCourse,
//             date: lastVisitedCourseDate,
//           } : null,
//           totalCoursesVisited: Object.keys(courseFrequency).length,
//         } : null,
//       };
  
//       return reply.status(200).send(response);
//     } catch (err) {
//       console.error(err);
//       return reply.status(500).send({
//         error: 'Erreur lors de la récupération des statistiques.',
//       });
//     }
//   };




//   interface GetCoursesStat {
//     courseId: string;
// }


// export const getCourseStats = async (req: FastifyRequest<{ Querystring: GetCoursesStat }>, reply: FastifyReply) => {
//     const courseId = req.query.courseId;
//     console.log(courseId);

//     try {
//         // Vérifier si le cours existe
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return reply.status(404).send({ message: 'Cours non trouvé' });
//         }

//         const transactions = await Transaction.find({ to: courseId, cours: true });

//         const visits = await statSeeCourses.find({ courseId });

//         if (!transactions && !visits) {
//             return reply.status(404).send({
//                 message: 'Aucune transaction ni visite trouvée pour ce cours.',
//             });
//         }

//         // Calculs
//         const userFrequency: Record<string, number> = {}; // Fréquence des transactions (réservations)
//         const userVisits: Record<string, number> = {}; // Fréquence des visites
//         let totalCreditsAcquired = 0;
//         let totalCreditsPending = 0;

//         // Récupérer les utilisateurs ayant visité le cours (StatSeeCourses)
//         visits.forEach(visit => {
//             const userId = visit.userId;
                
//             // Ajouter à la fréquence des visites
//             userVisits[userId] = (userVisits[userId] || 0) + 1;
//             console.log(userVisits[userId]);
//         });

//         // Récupérer les transactions (pour les utilisateurs ayant payé ou réservé le cours)
//         transactions.forEach(transaction => {
//             const firstParticipant = transaction.participants[0]?.user;

//             // Comptabiliser la fréquence des utilisateurs ayant payé (réservé le cours)
//             if (firstParticipant) {
//                 userFrequency[firstParticipant] = (userFrequency[firstParticipant] || 0) + 1;
//             }

//             // Comptabiliser les crédits
//             if (transaction.status === 'completed' || transaction.status === 'forced') {
//                 totalCreditsAcquired += transaction.totalAmount;
//             } else if (transaction.status === 'pending') {
//                 totalCreditsPending += transaction.totalAmount;
//             }
//         });
        

//         // Transformer les données des utilisateurs en tableau
//         const userStats = await Promise.all(
//             Object.keys(Object.assign({}, userFrequency, userVisits)).map(async (userId) => {
//                 const user = await User.findById(userId);
//                 const visitFrequency = userVisits[userId] || 0;

//                 return {
//                     userId,
//                     userName: user ? user.name : 'Utilisateur inconnu',
//                     frequency: visitFrequency || 0, // Fréquence de réservation
//                     frequency_reserved: userFrequency[userId] || 0, // Fréquence de réservation
//                     reserved: userFrequency[userId] > 0, // Si réservé ou pas (si la transaction existe)
//                 };
//             })
//         );

//         // Construire la réponse
//         const response = {
//             courseId,
//             courseTitle: course.Title,
//             totalOrders: transactions.length,
//             totalCreditsAcquired,
//             totalCreditsPending,
//             userStats,
//         };

//         return reply.status(200).send(response);
//     } catch (err) {
//         console.error(err);
//         return reply.status(500).send({
//             error: 'Erreur lors de la récupération des statistiques du cours.',
//         });
//     }
// };


// export const getUserProStats = async (req: FastifyRequest<{ Querystring: any }>, reply: FastifyReply) => {
//     try {
//       const { userId } = req.query as { userId: string };
  
//       const userPro = await User.findById(userId);
  
//       if (!userPro || userPro.isPro !== true) {
//         return reply.status(404).send({ message: 'Utilisateur pro non trouvé.' });
//       }
  
//       // Récupérer les cours créés par cet utilisateur (id dans le champ 'by')
//       const userCourses = await Course.find({ by: userId });
//       console.log(userCourses);
  
//       if (!userCourses || userCourses.length === 0) {
//         return reply.status(404).send({ message: 'Aucun cours trouvé pour cet utilisateur.' });
//       }
  
//       // Récupérer les transactions où l'ID du cours est dans 'to' et où le champ 'by' du cours est égal à userId
//       const transactions = await Transaction.find({
//         to: { $in: userCourses.map(course => course._id) },
//       });


//       if (!transactions || transactions.length === 0) {
//         return reply.status(404).send({ message: 'Aucune transaction trouvée pour cet utilisateur.' });
//       }
  
//       let totalCreditsAcquired = 0;
//       let totalCreditsPending = 0;
//       let totalCreditsOwned = 0;
//       const courseIds: string[] = [];
//       const courseRatings: number[] = [];
  
//       // Parcourir les transactions pour calculer les crédits
//       for (const transaction of transactions) {
//           if (transaction.status === 'completed' || transaction.status === 'forced') {
//             totalCreditsAcquired += transaction.totalAmount;
//           } else if (transaction.status === 'pending') {
//             totalCreditsPending += transaction.totalAmount;
//           }
//         if (transaction.to) {
//           courseIds.push(transaction.to);
//         }
//       }
  
//       // Vérification des crédits possédés via les coins
//       const coins = await Coin.find({});
//       coins.forEach(coin => {
//         try {
//           const decoded = jwt.verify(coin.token, 'your_jwt_secret') as { id: string };
//           if (decoded.id === userId) {
//             totalCreditsOwned += 1;
//           }
//         } catch (err) {
//           console.error('Erreur de décodage du token', err);
//         }
//       });
  
//       // Récupérer les notes des cours de l'utilisateur
//       const courses = await Course.find({ by: userId });
  
//       for (let i = 0; i < courses.length; i++) {
//         const course = courses[i];
  
//         if (course && course.note && course.note.length > 0) {
//           const courseAverageRating = course.note.reduce((acc, { note }) => acc + note, 0) / course.note.length;
//           courseRatings.push(courseAverageRating);
//         }
//       }
  
//       // Calcul de la moyenne des notes de tous les cours
//       const averageRating = courseRatings.length > 0
//         ? courseRatings.reduce((acc, rating) => acc + rating, 0) / courseRatings.length
//         : 0;
  
//       // Réponse structurée avec les données de l'utilisateur pro
//       const response = {
//         userId,
//         userName: userPro.name,
//         totalCreditsAcquired,
//         totalCreditsPending,
//         totalCreditsOwned,
//         courseIds: [...new Set(courseIds)],
//         averageRating
//       };
  
//       return reply.status(200).send({ userProStats: response });
//     } catch (err) {
//       console.error(err);
//       return reply.status(500).send({ error: 'Erreur lors de la récupération des statistiques.' });
//     }
//   };
  