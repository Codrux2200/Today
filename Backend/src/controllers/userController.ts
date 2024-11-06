
import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserById, addUser } from '../services/userService';

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = await getUserById(request.params['id']);
  return user ? reply.send(user) : reply.status(404).send({ message: 'User not found' });
};

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = await addUser(request.body);
  return reply.status(201).send(user);
};
    