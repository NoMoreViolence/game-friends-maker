import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTeamPayload {
  @Field((type) => String)
  name: string;

  @Field((type) => String, { defaultValue: '', nullable: true })
  introduction?: string;
}
