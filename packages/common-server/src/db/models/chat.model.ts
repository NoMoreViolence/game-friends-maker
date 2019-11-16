import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

import { IPost } from './post.model';
import { IUser } from './user.model';

export interface IChat {
  _id: ObjectId;

  text: string;
  postId: IPost['_id'];
  userId: IUser['_id'];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    text: { type: String, required: true },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      autopopulate: {
        maxDepth: 1,
        select: '_id',
      },
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: {
        maxDepth: 1,
        select: '_id',
      },
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IChat> = chatSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<IChat> = softDeleteSchema.plugin(autoPopulate);

export type ChatDocument = IChat & Document;
export const ChatModel = model<ChatDocument>('Chat', autoPopulatedSchema);
