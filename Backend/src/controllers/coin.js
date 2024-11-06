import crypto from 'crypto';

 
const  activeTokens = new Map();


export const createNewCoin = async (ownerId) => {

        const tokenData = {
            uuid: crypto.randomUUID(),
            ownerId: ownerId,
            createdAt: new Date(),
        };
    
        const tokenString = JSON.stringify(tokenData);
        const signature = crypto.createHmac('sha256', 'secretKey').update(tokenString).digest('hex');
    
        const token = `${Buffer.from(tokenString).toString('base64')}.${signature}`;
        activeTokens.set(tokenData.uuid, tokenData);
        console.log(activeTokens);
        return token;
};


export const TestCoin = async () => {

    const [tokenPayload, signature] = token.split('.');
    const expectedSignature = crypto.createHmac('sha256', 'secretKey').update(tokenPayload).digest('hex');

    if (expectedSignature !== signature) {
        return null;  
    }

    const tokenData = JSON.parse(Buffer.from(tokenPayload, 'base64').toString());

    if (!activeTokens.has(tokenData.uuid)) {
        return null;
    }

    return tokenData;
};


const TradeCoin = async () => {
    const tokenData = validateToken(token);
    if (!tokenData) return null;

    activeTokens.delete(tokenData.uuid);

    
    const newToken = generateToken(newOwnerId);

    return newToken;

};



