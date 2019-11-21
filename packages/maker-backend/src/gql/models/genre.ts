import { ObjectId } from 'bson';
import { GQLGenre } from '@common-server';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Genre implements GQLGenre {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  name: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
