
import { FastifyReply, FastifyRequest } from 'fastify';
import Creator from '../models/Creator';

export const createCreatorHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const creator = new Creator(req.body);
    await creator.save();
    reply.status(201).send(creator);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getCreatorsHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const creators = await Creator.find();
    reply.send(creators);
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const getCreatorByIdHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const creator = await Creator.findById((req.params as { id: string }).id);
    if (!creator) {
      reply.status(404).send({ message: 'Creator not found' });
      return;
    }
    reply.send(creator);
  } catch (err) {
    reply.status(500).send(err);
  }
};
