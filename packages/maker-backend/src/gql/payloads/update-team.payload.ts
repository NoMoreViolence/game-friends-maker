import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateTeamPayload {
  @Field(type => String, { nullable: true })
  name?: string;

  @Field(type => String, { nullable: true })
  introduction?: string;
}
