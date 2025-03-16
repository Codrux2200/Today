import { FastifyReply, FastifyRequest } from 'fastify';
import { Review } from '../models/Review';
import { Course } from '../models/Course';
import  User  from '../models/User';

// Ajouter un avis
export const addReviewHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  const { courseId, rating, comment } = req.body as { courseId: string, rating: number, comment: string };

  try {
    // Vérification que le cours existe
    const course = await Course.findById(courseId);
    if (!course) {
      return reply.status(404).send({ message: 'Le cours n\'existe pas' });
    }

    // Vérification que la note est valide (entre 1 et 5)
    if (rating < 1 || rating > 5) {
      return reply.status(400).send({ message: 'La note doit être entre 1 et 5' });
    }

    // Créer un nouvel avis
    const newReview = new Review({
      courseId,
      userId: req.user.id,
      rating,
      comment,
    });

    await newReview.save();
    reply.status(201).send({ message: 'Avis ajouté avec succès', review: newReview });
  } catch (error : any) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors de l\'ajout de l\'avis', error: error.message });
  }
};

// Récupérer tous les avis d'un cours
export const getCourseReviewsHandler = async (req: FastifyRequest<{Params : {courseId : string}}>, reply: FastifyReply) => {
  const { courseId } = req.params;

  try {
    const reviews = await Review.find({ courseId }).populate('userId');
    if (reviews.length === 0) {
      return reply.status(404).send({ message: 'Aucun avis trouvé pour ce cours' });
    }
    reply.status(200).send({ reviews });
  } catch (error : any) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors de la récupération des avis', error: error.message });
  }
};

// Récupérer un avis spécifique
export const getReviewByIdHandler = async (req: FastifyRequest<{Params : {reviewId : string}}>, reply: FastifyReply) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId).populate('userId');
    if (!review) {
      return reply.status(404).send({ message: 'Avis non trouvé' });
    }
    reply.status(200).send({ review });
  } catch (error : any) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors de la récupération de l\'avis', error: error.message });
  }
};

// Récupérer toutes les reviews d'un utilisateur
export const getUserReviewsHandler = async (req: FastifyRequest<{Params : {userId : string}}>, reply: FastifyReply) => {
  const { userId } = req.params;

  try {
    const reviews = await Review.find({ userId }).populate('courseId');
    if (reviews.length === 0) {
      return reply.status(404).send({ message: 'Aucun avis trouvé pour cet utilisateur' });
    }
    reply.status(200).send({ reviews });
  } catch (error : any) {
    console.error(error );
    reply.status(500).send({ message: 'Erreur lors de la récupération des avis', error: error.message });
  }
};

// Modifier un avis
export const updateReviewHandler = async (req: FastifyRequest<{ Params: { reviewId: string }, Body: { rating: number, comment: string } }>, reply: FastifyReply) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    // Vérification que l'avis existe
    const review = await Review.findById(reviewId);
    if (!review) {
      return reply.status(404).send({ message: 'Avis non trouvé' });
    }

    // Vérification que l'utilisateur est bien celui qui a laissé l'avis
    if (review.userId.toString() !== req.user.id) {
      return reply.status(403).send({ message: 'Vous ne pouvez pas modifier cet avis' });
    }

    // Vérification que la note est valide (entre 1 et 5)
    if (rating < 1 || rating > 5) {
      return reply.status(400).send({ message: 'La note doit être entre 1 et 5' });
    }

    // Mise à jour de l'avis
    review.rating = rating;
    review.comment = comment;
    await review.save();

    reply.status(200).send({ message: 'Avis modifié avec succès', review });
  } catch (error : any) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors de la mise à jour de l\'avis', error: error.message });
  }
};

// Supprimer un avis
export const deleteReviewHandler = async (req: FastifyRequest<{Params : {reviewId : string}}>, reply: FastifyReply) => {
  const { reviewId } = req.params;

  try {
    // Vérification que l'avis existe
    const review = await Review.findById(reviewId);
    if (!review) {
      return reply.status(404).send({ message: 'Avis non trouvé' });
    }

    // Vérification que l'utilisateur est bien celui qui a laissé l'avis
    if (review.userId.toString() !== req.user.id) {
      return reply.status(403).send({ message: 'Vous ne pouvez pas supprimer cet avis' });
    }

    // Suppression de l'avis
    await review.deleteOne();
    reply.status(200).send({ message: 'Avis supprimé avec succès' });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors de la suppression de l\'avis', error: (error as any).message });
  }
};

// Fonction de filtrage des avis par note
export const filterReviewsByRatingHandler = async (req: FastifyRequest<{ Params: { courseId: string, minRating: number } }>, reply: FastifyReply) => {
  const { courseId, minRating } = req.params;

  try {
    const reviews = await Review.find({ courseId }).where('rating').gte(minRating).populate('userId');
    if (reviews.length === 0) {
      return reply.status(404).send({ message: 'Aucun avis trouvé avec cette note minimum' });
    }
    reply.status(200).send({ reviews });
  } catch (error : any) {
    console.error(error);
    reply.status(500).send({ message: 'Erreur lors du filtrage des avis', error: error.message });
  }
};
