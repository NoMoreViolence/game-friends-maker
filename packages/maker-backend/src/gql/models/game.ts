import { ObjectId } from 'bson';
import { IGame } from '@common-server';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Game implements IGame {
  @Field((type) => String)
  _id: ObjectId;

  @Field((type) => String)
  name: string;

  @Field((type) => [String])
  genreIds: ObjectId[];

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Boolean)
  deleted: boolean;
}
