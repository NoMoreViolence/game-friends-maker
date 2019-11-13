import { ObjectId } from 'bson';

export interface GenreItem {
  _id: ObjectId;
  name: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
