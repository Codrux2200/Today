
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IStatConnexion extends Document {
  _id: string;
  userId: string;
  data: any;
  createdAt : any;
}

const StatConnexionSchema: Schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    userId : {type : String, required: true},
    data : {type : Object, required: true}
  },
  { timestamps: true }
);

export default mongoose.model<IStatConnexion>('StatConnexion', StatConnexionSchema);
