import { ObjectId } from 'bson';
import { IChat } from '@common-server';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class Chat implements IChat {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  text: string;

  @Field(type => String)
  userId: ObjectId;

  @Field(type => String)
  channelId: ObjectId;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
