import { ObjectId } from 'bson';
import { GQLUser } from '@common-server';
import { Field, ObjectType } from 'type-graphql';
import { Post } from './post';

@ObjectType()
export class User implements GQLUser {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  name: string;

  @Field(type => String)
  email: string;

  @Field(type => [Post])
  posts: Post[];

  @Field(type => [Post])
  pendingTeams: Post[];

  @Field(type => [Post])
  relatedTeams: Post[];

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
