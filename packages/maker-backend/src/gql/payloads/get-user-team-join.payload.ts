import { Field, InputType } from 'type-graphql';

@InputType()
export class GetTeamUserJoinPayload {
  @Field((type) => String, { nullable: true })
  userId?: string;

  @Field((type) => String, { nullable: true })
  teamId?: string;
}
