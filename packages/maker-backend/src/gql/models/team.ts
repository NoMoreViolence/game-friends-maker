import { ObjectId } from 'bson';
import { ITeam } from '@common-server';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Team implements ITeam {
  @Field((type) => String)
  _id: ObjectId;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  gameId: ObjectId;

  @Field((type) => String)
  introduction: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Boolean)
  deleted: boolean;
}
