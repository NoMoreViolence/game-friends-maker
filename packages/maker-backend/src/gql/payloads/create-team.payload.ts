import { ObjectId } from 'bson';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTeamPayload {
  @Field(type => String)
  teamName: string;

  @Field(type => String)
  gameId: ObjectId;

  @Field(type => String, { defaultValue: '', nullable: true })
  introduction?: string;
}
