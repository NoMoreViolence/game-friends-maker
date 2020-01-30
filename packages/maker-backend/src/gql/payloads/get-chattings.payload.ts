import { Field, InputType } from 'type-graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class GetChattingsPayload {
  @Field(type => Number)
  limit: ObjectId; // 20

  @Field(type => Number)
  direction: 1 | -1; // 1: 미래, -1: 과거

  @Field(type => String)
  date: string; // 기준 날짜
}
