
import { BaseModel } from '../models/BaseModel';

interface Coin {
  _id?: string;
  name: string;
  symbol: string;
  value: number;
}

export class CoinService extends BaseModel<Coin> {
  constructor() {
    super('coins');  // MongoDB collection name for coins
  }

  async getCoinById(id: string) {
    return await this.findById(id);
  }

  async createCoin(data: Omit<Coin, '_id'>) {
    return await this.create(data);
  }
}
    