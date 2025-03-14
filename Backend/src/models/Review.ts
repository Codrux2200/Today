import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export interface IReview extends Document {
  _id: string;
  courseId: string; // Référence au cours
  userId: string;   // Référence à l'utilisateur ayant laissé l'avis
  rating: number;   // Note de l'avis (par exemple de 1 à 5)
  comment: string;  // Commentaire de l'avis
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    courseId: { type: String, ref: 'Course', required: true },
    userId: { type: String, ref: 'User', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>('Review', ReviewSchema);


