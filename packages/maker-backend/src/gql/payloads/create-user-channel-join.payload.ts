import { Field, InputType } from 'type-graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class CreateUserChannelJoinPayload {
  @Field((type) => String)
  teamId: ObjectId;

  @Field((type) => String)
  userId: ObjectId;

  @Field((type) => String)
  channelId: ObjectId;
}
