import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export interface ICoin extends Document {
    token : string;
}

const CoinSchema: Schema = new Schema(
  {
   token : { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICoin>('Coin', CoinSchema);
