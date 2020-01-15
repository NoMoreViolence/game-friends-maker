import { Field, InputType } from 'type-graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class CreateChannelPayload {
  @Field(type => String)
  name: string;

  @Field(type => String)
  teamId: ObjectId;
}
