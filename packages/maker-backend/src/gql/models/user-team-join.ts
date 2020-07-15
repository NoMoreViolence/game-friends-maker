import { IUserTeamJoin, UserTeamJoinState } from '@common-server';
import { ObjectId } from 'bson';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserTeamJoin implements IUserTeamJoin {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String)
  displayName: string;

  @Field(() => String)
  teamId: ObjectId;

  @Field(() => String)
  userId: ObjectId;

  @Field(() => String)
  userState: UserTeamJoinState;

  @Field(() => Boolean)
  muted: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Boolean)
  deleted: boolean;
}
