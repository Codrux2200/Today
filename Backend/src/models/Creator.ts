import mongoose, { Schema, Document } from 'mongoose';

export interface ICreator extends Document {
  name: string;
  email: string;
  bio: string;
  courses: mongoose.Schema.Types.ObjectId[];
}

const CreatorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  },
  { timestamps: true }
);

export default mongoose.model<ICreator>('Creator', CreatorSchema);
