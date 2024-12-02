import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export interface ITrash extends Document {
    tokens : string;
}

const TrashSchema: Schema = new Schema(
  {
   tokens : { type: [], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITrash>('Trash', TrashSchema);
