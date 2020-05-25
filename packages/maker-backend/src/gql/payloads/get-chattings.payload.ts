import { Field, InputType } from 'type-graphql';

@InputType()
export class GetChattingsPayload {
  @Field((type) => Number)
  limit: number; // 20

  @Field((type) => Number)
  direction: 1 | -1; // 1: 미래, -1: 과거

  @Field((type) => String)
  date: Date; // 기준 날짜
}
