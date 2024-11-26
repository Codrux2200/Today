
import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../models/User';

export const createUserHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = new User(req.body);
    await user.save();
    reply.status(201).send(user);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getUsersHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (err) {
    reply.status(500).send(err);
  }
};
