
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUserCoursesConnexion extends Document {
  _id: string;
  userId: string;
  courseId : string;
  createdAt : any;
}

const StatUserCoursesSchema: Schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    userId : {type : String, required: true},
    courseId : {type : String, required : true},
  },
  { timestamps: true }
);

export default mongoose.model<IUserCoursesConnexion>('StatUsercourses', StatUserCoursesSchema);
