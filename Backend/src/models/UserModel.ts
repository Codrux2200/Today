
import { BaseModel } from './BaseModel';

interface User {
  _id?: string;
  name: string;
  email: string;
}

export class UserModel extends BaseModel<User> {
  constructor() {
    super('users');  // MongoDB collection name
  }
}
    