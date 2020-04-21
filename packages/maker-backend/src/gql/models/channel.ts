import { ObjectId } from 'bson';
import { IChannel } from '@common-server';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Channel implements IChannel {
  @Field((type) => String)
  _id: ObjectId;

  @Field((type) => String)
  teamId: ObjectId;

  @Field((type) => String)
  name: string;

  @Field((type) => Date)
  firstChatCreatedAt: Date;

  @Field((type) => Date)
  lastChatCreatedAt: Date;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Boolean)
  deleted: boolean;
}
