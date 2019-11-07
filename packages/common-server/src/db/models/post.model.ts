import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

import { Game } from './game.model';
import { User } from './user.model';

export interface Post extends Document {
  _id: ObjectId;
  name: string;

  gameId: Game['_id'];
  authorId: User['_id'];
  relatedPeopleIds: Array<User['_id']>;

  introduction: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const postSchema: Schema<Post> = new Schema(
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
const softDeleteSchema: Schema<Post> = postSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<Post> = softDeleteSchema.plugin(autoPopulate);

export type PostDocument = Post & Document;
export const PostModel = model<PostDocument>('Post', autoPopulatedSchema);
