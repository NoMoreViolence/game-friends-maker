import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTeamPayload {
  @Field(() => String)
  name: string;

  @Field(() => String, { defaultValue: '', nullable: true })
  introduction?: string;
}
