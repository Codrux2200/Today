
import Fastify from 'fastify';
import mongoose from 'mongoose';
import registerRoutes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  const app = Fastify();
  const PORT = process.env.PORT || 3000;

  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('🚀 MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }

  registerRoutes(app);

  try {
    await app.listen({ port: Number(PORT) });
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
};


startServer().catch(err => {
  console.error('❌ Error in startServer:', err);
  process.exit(1);
});
