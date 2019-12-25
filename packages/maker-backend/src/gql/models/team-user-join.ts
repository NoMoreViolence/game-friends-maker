import { ObjectId } from 'bson';
import { Field, ObjectType } from 'type-graphql';
import { GQLTeamUserJoin, TeamUserJoinState } from '@common-server';
import { User } from './user';
import { Team } from './team';

@ObjectType()
export class TeamUserJoin implements GQLTeamUserJoin {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => Team)
  teamId: Team;

  @Field(type => User)
  userId: User;

  @Field(type => String)
  userState: TeamUserJoinState;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
