
import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getInfoFromIp } from '../utils/ipRelated';
import ValidatedEmails from '../models/ValidatedEmail';
import EmailVerification from '../models/Emailverification';
import nodemailer from 'nodemailer';

export const verifyMail = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
      const { email } = req.body as { email: string };

      // Vérifier si l'email est déjà validé
      const isAlreadyValidated = await ValidatedEmails.findOne({ email });
      if (isAlreadyValidated) {
          return reply.status(400).send({ message: "Email already verified" });
      }

      // Générer un code à 4 chiffres
      const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

      // Définir la date d'expiration (10 minutes)
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      // Enregistrer dans la DB (remplace l'ancien code s'il y en a un)
      await EmailVerification.findOneAndUpdate(
          { email },
          { code: verificationCode, expiresAt },
          { upsert: true, new: true }
      );

      // Configurer le transporteur Nodemailer
      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });
      // Envoyer l'email
      await transporter.sendMail({
          from: `"No Reply" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Email Verification Code",
          text: `Your verification code is: ${verificationCode}`
      });

      reply.send({ message: "Verification code sent" });
  } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Error sending verification email" });
  }
};


export const VerifyToken = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req.headers.authorization;
  if (!token) {
    return reply.status(401).send({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    reply.status(200).send({ message: 'Token is valid', value : true });
  } catch (err) {
    reply.status(401).send({ message: 'Invalid token', value : false });
  }
};



export const confirmMail = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
      const { email, code } = req.body as { email: string; code: string };

      // Chercher le code en DB
      const verificationEntry = await EmailVerification.findOne({ email });

      if (!verificationEntry) {
          return reply.status(400).send({ message: "No verification code found" });
      }

      // Vérifier si le code est correct et non expiré
      if (verificationEntry.code !== code) {
          return reply.status(400).send({ message: "Invalid verification code" });
      }

      if (new Date() > verificationEntry.expiresAt) {
          return reply.status(400).send({ message: "Verification code expired" });
      }

      // Ajouter l'email dans la liste des emails validés
      await new ValidatedEmails({ email }).save();

      // Supprimer l'entrée temporaire
      await EmailVerification.deleteOne({ email });

      reply.send({ message: "Email verified successfully" });
  } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Error verifying email" });
  }
};

export const registerHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email , password, name, img } = req.body as { email : string; password: string; name : string, img : Blob};
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
    console.log("test");
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

export const getProfileHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.body as {id : string};
  try {
    const user = await User.find({ _id : id, isPro : true });
    if (!user) {
      return reply.status(404).send({ message: 'User not found or is not a pro user' });
    }
    reply.send({name : user[0].name, picture : user[0].profilePicture, adress : null});
  } catch (err) {
    reply.status
    (500).send("Error getting user profile");
  }
};
