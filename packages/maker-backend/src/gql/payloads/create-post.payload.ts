import { ObjectId } from 'bson';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreatePostPayload {
  @Field(type => String)
  postName: string;

  @Field(type => String)
  gameId: ObjectId;

  @Field(type => String, { defaultValue: '', nullable: true })
  introduction?: string;
}
