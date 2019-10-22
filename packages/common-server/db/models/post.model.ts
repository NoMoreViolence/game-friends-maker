import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';
import { UserModel } from './user.model';
import { GameModel } from './game.model';

export interface Post extends Document {
  _id: ObjectId;
  name: string;

  gameId: ObjectId;
  authorId: ObjectId;
  relatedPeopleIds: ObjectId[];

  limit: number;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const postSchema: Schema<Post> = new Schema(
  {
    name: { type: String, required: true, default: "Jihoon's Game number one" },
    limit: { type: Number, required: true, default: 2 },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: GameModel,
      autopopulate: {
        maxDepth: 1,
        select: '_id name',
      },
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      autopopulate: {
        maxDepth: 1,
        select: '_id name email',
      },
    },
    relatedPeopleIds: [
      {
        type: Schema.Types.ObjectId,
        ref: UserModel,
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
export const PostModel = model<PostDocument>('posts', autoPopulatedSchema);
