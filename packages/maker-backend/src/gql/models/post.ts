import { ObjectId } from 'bson';
import { GQLPost } from '@common-server';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user';
import { Game } from './game';

@ObjectType()
export class Post implements GQLPost {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  name: string;

  @Field(type => Game)
  gameId: Game;

  @Field(type => User)
  authorId: User;

  @Field(type => [User])
  relatedPeopleIds: User[];

  @Field(type => String)
  introduction: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
