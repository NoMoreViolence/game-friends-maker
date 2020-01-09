import { Field, InputType, registerEnumType } from 'type-graphql';

@InputType()
export class GetTeamsPayload {
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

  @Field(type => String, { nullable: true })
  sort?: Sort;
}
