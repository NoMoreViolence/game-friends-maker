import { ObjectId } from 'bson';
import { GQLGame } from '@common-server';
import { Field, ObjectType } from 'type-graphql';
import { Genre } from './genre';

@ObjectType()
export class Game implements GQLGame {
  @Field(type => String)
  _id: ObjectId;

  @Field(type => String)
  name: string;

  @Field(type => [Genre])
  genres: Genre[];

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean)
  deleted: boolean;
}
