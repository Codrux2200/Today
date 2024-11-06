
import { FastifyInstance } from 'fastify';
import { getUser, createUser } from '../controllers/userController';

export default async function userRoutes(server: FastifyInstance) {
  server.get('/:id', getUser);
  server.post('/', createUser);
}
    