
import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getInfoFromIp } from '../utils/ipRelated';


export const registerHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email , password, name } = req.body as { email : string; password: string; name : string };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    reply.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    reply.status(500).send(err);
  }
};

export const loginHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { username, password } = req.body as { username: string; password: string };
    const user = await User.findOne({ username });
    if (!user) {
      return reply.status(401).send({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(401).send({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, name : user.name, email : user.email,
      profilePicture : user.profilePicture, isPro : user.isPro
    }, 'your_jwt_secret', { expiresIn: '1h' });

    await getInfoFromIp("41.92.15.212", user._id);
    reply.send({ token });
  } catch (err) {
    reply.status(500).send(err);
  }
};


export const loginAdminHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { username, password } = req.body as { username: string; password: string };
    const user = await User.findOne({ username });
    if (!user) {
      return reply.status(401).send({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(401).send({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, name : user.name, email : user.email,
      profilePicture : user.profilePicture, isPro : user.isPro
    }, 'your_jwt_secret', { expiresIn: '1h' });
    reply.send({ token });
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
