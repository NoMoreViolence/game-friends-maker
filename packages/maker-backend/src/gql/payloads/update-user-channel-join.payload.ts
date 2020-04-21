import { Field, InputType } from 'type-graphql';

@InputType()
export class UserChannelJoinUpdatePayload {
  @Field((type) => String, { nullable: true })
  firstChatReadAt?: Date;

  @Field((type) => String, { nullable: true })
  lastChatReadAt?: Date;
}
