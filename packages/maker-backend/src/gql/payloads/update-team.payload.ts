import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateTeamPayload {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  introduction?: string;
}
