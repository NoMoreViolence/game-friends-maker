import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

import { IGame } from './game.model';
import { IUser } from './user.model';

export interface IPost {
  _id: ObjectId;
  name: string;

  gameId: IGame['_id'];
  authorId: IUser['_id'];
  relatedPeopleIds: Array<IUser['_id']>;

  introduction: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const postSchema: Schema<IPost> = new Schema(
  {
    name: { type: String, required: true, default: "Jihoon's Game number one" },
    introduction: { type: String, required: false, default: '' },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      autopopulate: {
        maxDepth: 1,
        select: '_id name',
      },
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: {
        maxDepth: 1,
        select: '_id name email',
      },
      required: true,
    },
    relatedPeopleIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: {
          maxDepth: 1,
          select: '_id name email',
        },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IPost> = postSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<IPost> = softDeleteSchema.plugin(autoPopulate);

export type PostDocument = IPost & Document;
export const PostModel = model<PostDocument>('Post', autoPopulatedSchema);
