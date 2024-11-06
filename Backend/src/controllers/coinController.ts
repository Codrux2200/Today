import crypto from 'crypto';


const activeTokens = new Map<string, any>();

export const createNewCoin = async (ownerId: string): Promise<string> => {
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

export const TestCoin = async (token: string): Promise<any> => {
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

const TradeCoin = async (token: string, newOwnerId: string): Promise<string | null> => {
  const tokenData = await TestCoin(token);
  if (!tokenData) return null;

  activeTokens.delete(tokenData.uuid);

  const newToken = await createNewCoin(newOwnerId);

  return newToken;
};
