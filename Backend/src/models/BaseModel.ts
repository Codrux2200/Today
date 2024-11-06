
import { getDB } from '../config/database';

export class BaseModel<T> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  private collection() {
    const db = getDB();
    return db.collection<T>(this.collectionName);
  }

  async create(data: T) {
    const result = await this.collection().insertOne(data);
    return result.ops[0];
  }

  async findAll() {
    return await this.collection().find({}).toArray();
  }

  async findById(id: string) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  async update(id: string, data: Partial<T>) {
    const result = await this.collection().updateOne({ _id: new ObjectId(id) }, { $set: data });
    return result.modifiedCount > 0;
  }

  async delete(id: string) {
    const result = await this.collection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}
    