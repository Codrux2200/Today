import { FastifyReply, FastifyRequest } from 'fastify';
import Coin from '../models/Coin';
import jwt from 'jsonwebtoken';
import Trash from '../models/Trash';


export const createCoinHandler = async (req: FastifyRequest, reply: FastifyReply) => { //temporarily car non secure
    try {
        const { userId } = req.body as { userId: string };
        let token;
        let isTokenInTrash;

        do {
            token = jwt.sign({ id: userId, createdAt: new Date().toLocaleString() }, 'your_jwt_secret');
            isTokenInTrash = await Trash.findOne({ token });
        } while (isTokenInTrash);

        const newCoin = new Coin({ token });
        await newCoin.save();
        reply.status(201).send({ message: 'Coin created successfully' });
    } catch (err) {
        reply.status(500).send(err);
    }
};

export const getUserCoinsHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId } = req.body  as { userId: string };

        const coins = await Coin.find();
        const userCoins = coins.filter(coin => {
            const decodedToken = jwt.verify(coin.token, 'your_jwt_secret') as { id: string, createdAt : string };
            console.log(decodedToken.id, userId);
            return decodedToken.id === userId;
        });
        const coinCount = userCoins.length;

        reply.status(200).send({ userId, coinCount });
    } catch (err) {
        reply.status(500).send(err);
    }
};

  

export const coinDestructor = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { token } = req.body as { token: string };

        const coin = await Coin.findOneAndDelete({ token });
        if (!coin) {
            return reply.status(404).send({ message: 'Coin not found' });
        }
        
        const trashedCoin = new Trash({ token });
        await trashedCoin.save();

        reply.status(200).send({ message: 'Coin deleted and moved to trash successfully' });
    } catch (err) {
        reply.status(500).send(err);
    }
};