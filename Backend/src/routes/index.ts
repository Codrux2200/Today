
import { FastifyInstance } from 'fastify';
import userRoutes from './userRoutes';

export const registerRoutes = (server: FastifyInstance) => {
  server.register(userRoutes, { prefix: '/users' });
};
    