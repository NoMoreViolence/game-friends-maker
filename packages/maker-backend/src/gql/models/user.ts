import { IUser } from '@common-server';
import { ObjectId } from 'bson';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User implements IUser {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String)
  givenName: string;

  @Field(() => String)
  familyName: string;

  @Field(() => String)
  nickName: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  googleId?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Boolean)
  deleted: boolean;
}
