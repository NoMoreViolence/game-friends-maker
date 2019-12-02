import { ObjectId } from 'bson';
import { GQLUser } from '@common-server';
import { Field, ObjectType } from 'type-graphql';
import { Team } from './team';

@ObjectType()
export class User implements GQLUser {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  name: string;

  @Field(type => String)
  email: string;

  @Field(type => [Team])
  teams: Team[];

  @Field(type => [Team])
  pendingTeams: Team[];

  @Field(type => [Team])
  relatedTeams: Team[];

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
