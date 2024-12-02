
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  isPro ?: boolean;
}

const UserSchema: Schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    isPro : {type : Boolean, default : false}
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
