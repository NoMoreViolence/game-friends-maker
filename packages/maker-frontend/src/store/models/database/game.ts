import { ObjectId } from 'bson';
import { GenreItem } from './genre';

export interface GameItem {
  _id: ObjectId;
  name: string;

  genres: GenreItem;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
