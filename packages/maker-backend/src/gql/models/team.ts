import { ITeam } from '@common-server';
import { ObjectId } from 'bson';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Team implements ITeam {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => String)
  introduction: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Boolean)
  deleted: boolean;
}
