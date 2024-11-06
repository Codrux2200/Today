
import { MongoClient, Db } from 'mongodb';

let db: Db;

export const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
  await client.connect();
  db = client.db('mydatabase');  // Name of the database
  console.log('Connected to MongoDB');
};

export const getDB = () => db;
    