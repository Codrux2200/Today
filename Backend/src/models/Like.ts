import mongoose, { Schema, Document } from 'mongoose';

export interface ILike extends Document {
  userId: string;         // ID de l'utilisateur
  itemId: string;         // ID de l'élément (cours ou avis)
  itemType: 'course' | 'review'; // Type d'élément : 'course' ou 'review'
  createdAt: Date;        // Date de création
}

const LikeSchema: Schema = new Schema(
  {
    userId: { type: String, ref: 'User', required: true },
    itemId: { type: String, required: true },
    itemType: { type: String, enum: ['course', 'review'], required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Like = mongoose.model<ILike>('Like', LikeSchema);
