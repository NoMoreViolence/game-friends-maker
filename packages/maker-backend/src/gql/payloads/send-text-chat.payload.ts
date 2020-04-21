import { Field, InputType } from 'type-graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class SendTextChatPayload {
  @Field((type) => String)
  _id: ObjectId;

  @Field((type) => String)
  channelId: ObjectId;

  @Field((type) => String)
  text: string;
}
