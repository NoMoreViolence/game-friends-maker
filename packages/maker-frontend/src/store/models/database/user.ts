import { ObjectId } from 'bson';

export interface UserItem {
  _id: ObjectId;

  name: string;
  email: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
