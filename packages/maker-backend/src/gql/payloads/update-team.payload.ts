import { ObjectId } from 'bson';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class UpdateTeamPayload {
  @Field(type => String, { nullable: true })
  name?: string;

  @Field(type => String, { nullable: true })
  introduction?: string;
}
