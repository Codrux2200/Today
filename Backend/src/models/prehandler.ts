import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    user?: any;
  }
}


export const VerifyToken = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      // Récupérer le token depuis l'en-tête Authorization (format: "Bearer <token>")
      const token = req.headers['authorization']?.split(' ')[1]; // Prendre la partie après "Bearer"
      console.log(token);
      if (!token) {
        return reply.status(401).send({ message: 'Token is required' });
      }
  
      // Vérifier et décoder le token
      const secretKey = process.env.JWT_SECRET || 'your_jwt_secret'; // Votre clé secrète
      const decoded: any = jwt.verify(token, secretKey); // Décodage du token
      if (!decoded || !decoded.id) {
        return reply.status(401).send({ message: 'Invalid token' });
      }
  
      // Ajouter l'ID de l'utilisateur au request pour qu'il soit accessible dans le gestionnaire de la route
      req.user = decoded; // L'ID de l'utilisateur est dans le payload du token
  
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: 'Error verifying token' });
    }
  };