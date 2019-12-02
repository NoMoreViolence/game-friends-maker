import { Field, InputType, registerEnumType } from 'type-graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class GetTeamPayload {
  @Field(type => String, { nullable: true })
  _id?: ObjectId;

  @Field(type => String, { nullable: true })
  name?: string;

  @Field(type => String, { nullable: true })
  gameId?: ObjectId;

  @Field(type => String, { nullable: true })
  authorId?: ObjectId;
}

@InputType()
export class GetTeamsPayload {
  @Field(type => String, { nullable: true })
  authorId?: ObjectId;

  @Field(type => String, { nullable: true })
  name?: string;
}

export enum Sort {
  DESC = 'desc',
  ASC = 'ASC',
}
registerEnumType(Sort, {
  name: 'Sort',
});

@InputType()
export class GetTeamsOptionPayload {
  @Field(type => String, { nullable: true })
  offsetId?: string;

  @Field(type => Sort, { nullable: true })
  sort?: Sort;
}
