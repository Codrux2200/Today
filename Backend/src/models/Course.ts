import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ICourse extends Document {
  _id: string;
  title: string;
  description?: string;
  private?: boolean;
  memberMax: number;
  memberMin: number;
  location: { lat: number; long: number };
  by: string | null;
  price: number;
  img: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    title: { type: String, required: true },
    description: { type: String },
    type : { type: String, required: true },
    what : { type: String, required: true },
    private: { type: Boolean, default: false },
    about : { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true }
    },
    by: { type: String },
    price: { type: Number, required: true },
    img: { type: String, required: true }
  },
  { timestamps: true }
);

export interface ISpecificCourse extends Document {
  _id: string;
  courseId: string;
  date: Date;
  type: string;
  what : string;
  time: string;
  slots: number;
  members: string[];
  priceOverride?: number;
  status: 'upcoming' | 'full' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const SpecificCourseSchema: Schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    courseId: { type: String, ref: 'Course', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    slots: { type: Number, required: true },
    members: { type: [String], default: [] },
    priceOverride: { type: Number },
    status: {
      type: String,
      enum: ['upcoming', 'full', 'cancelled', 'completed'],
      default: 'upcoming'
    }
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>('Course', CourseSchema);
export const SpecificCourse = mongoose.model<ISpecificCourse>('SpecificCourse', SpecificCourseSchema);
