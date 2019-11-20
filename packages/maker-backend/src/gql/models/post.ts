import { ObjectId } from 'bson';
import { IPost } from '@common-server';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class Post implements IPost {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  name: string;

  @Field(type => String)
  gameId: ObjectId;

  @Field(type => String)
  authorId: ObjectId;

  @Field(type => [ID])
  relatedPeopleIds: ObjectId[];

  @Field(type => String)
  introduction: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
