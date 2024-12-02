
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ICourse extends Document {
  _id: string;
  Title: string;
  date: string;
  private ?: boolean;
  memberMax : number;
  memberMin : number;
  status: boolean;
  location: { lat: number; long: number };
  by: string | null;
  members: string | null;
  note: { note: number; by: string; comment: string }[];
  price: number;
  img : string;
  completed: boolean;
}

const CourseSchema: Schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    Title: { type: String, required: true },
    date: { type: String, required: true },
    private: { type: Boolean, default: false },
    memberMin: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
    MemberMax: { type: Number, required: true },
    location: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true }
    },
    completed: { type: Boolean, default: false },
    by: { type: String},
    members: [{}],
    note: [{ note: Number, by: String, comment: String }],
    price: { type: Number, required: true },
    img : {required: true, type : 'string'}
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', CourseSchema);
