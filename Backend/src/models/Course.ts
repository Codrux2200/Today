
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ICourse extends Document {
  _id: string;
  Title: string;
  date: string;
  status: boolean;
  location: { lat: number; long: number };
  by: mongoose.Schema.Types.ObjectId | null;
  members: mongoose.Schema.Types.ObjectId[] | null;
  note: { note: number; by: string; comment: string }[];
  price: number;
}

const CourseSchema: Schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    Title: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: Boolean, default: false },
    location: { 
      lat: { type: Number, required: true },
      long: { type: Number, required: true }
    },
    by: { type: Schema.Types.ObjectId, ref: 'Creator' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    note: [{ note: Number, by: String, comment: String }],
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', CourseSchema);
