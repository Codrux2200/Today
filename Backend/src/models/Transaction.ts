import { Schema, Types, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface Participant {
    user: string;
    shareAmount: number;
    status: 'pending' | 'paid'; 
}
  

  export interface ITransaction {
    _id ?: string;
    payer: string;
    group: boolean;
    cours : boolean,
    to : string,
    participants: Participant[];
    totalAmount: number; 
    status: 'pending' | 'completed';
    coinUsed: string; 
    createdAt: Date; 
    updatedAt: Date;
}

const TransactionSchema = new Schema(
  {
   _id: { type: String, default: () => uuidv4() },
   group : {type : Boolean, default : false},
   to : {type : String},
   cours : {type : Boolean, default : false},
    payer: { type: String, ref: 'User', required: true }, 
    participants: [
      {
        user: { type: String, ref: 'User' }, 
        shareAmount: { type: Number, required: true }, 
        status: { type: String, enum: ['pending', 'paid'], default: 'pending' }, 
      },
    ],
    totalAmount: { type: Number, required: true }, 
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }, 
    coinUsed: [{ type: String, ref: 'Coin' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Transaction = model('Transaction', TransactionSchema);