import { IChat, ChatType } from '@common-server';
import { ObjectId } from 'bson';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Chat implements IChat {
  @Field((type) => String)
  _id: ObjectId;

  @Field((type) => String)
  type: ChatType;

  @Field((type) => String)
  text: string;

  @Field((type) => String)
  userId: ObjectId;

  @Field((type) => String)
  channelId: ObjectId;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Boolean)
  deleted: boolean;
}
