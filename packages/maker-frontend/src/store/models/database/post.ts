import { ObjectId } from 'bson';
import { UserItem } from './user';
import { GameItem } from './game';

export interface PostItem {
  _id: ObjectId;
  name: string;

  gameId: GameItem;
  authorId: UserItem;
  relatedPeopleIds: UserItem;

  introduction: string;

  createdAt: Date;
  updatedAt: Date;
}
