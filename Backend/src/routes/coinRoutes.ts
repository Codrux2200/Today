
import { FastifyInstance } from 'fastify';
import { getCoin, createCoin } from '../controllers/coinController';

export default async function coinRoutes(server: FastifyInstance) {
  server.get('/:id', getCoin);
  server.post('/', createCoin);
}
    