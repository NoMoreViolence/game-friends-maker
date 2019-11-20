import { ObjectId } from 'bson';
import { IUser } from '@common-server';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class User implements IUser {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  name: string;

  @Field(type => String)
  email: string;

  @Field(type => ID)
  posts: ObjectId;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
