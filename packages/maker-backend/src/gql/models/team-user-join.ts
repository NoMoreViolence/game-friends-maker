import { ObjectId } from 'bson';
import { Field, ObjectType } from 'type-graphql';
import { ITeamUserJoin, TeamUserJoinState } from '@common-server';

@ObjectType()
export class TeamUserJoin implements ITeamUserJoin {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  teamId: ObjectId;

  @Field(type => String)
  userId: ObjectId;

  @Field(type => String)
  userState: TeamUserJoinState;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
