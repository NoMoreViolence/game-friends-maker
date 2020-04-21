import { ObjectId } from 'bson';
import { IUser } from '@common-server';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User implements IUser {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Boolean)
  deleted: boolean;
}
