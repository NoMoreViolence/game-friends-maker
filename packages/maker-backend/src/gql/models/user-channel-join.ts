import { ObjectId } from 'bson';
import { IUserChannelJoin } from '@common-server';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserChannelJoin implements IUserChannelJoin {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  teamId: ObjectId;

  @Field(type => String)
  userId: ObjectId;

  @Field(type => String)
  channelId: ObjectId;

  @Field(type => Boolean)
  muted: boolean;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
