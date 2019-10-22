import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';
import { PostModel } from './post.model';
import { UserModel } from './user.model';

export interface Chat extends Document {
  _id: ObjectId;

  text: string;
  postId: ObjectId;
  userId: ObjectId;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const chatSchema: Schema<Chat> = new Schema(
  {
    text: { type: String, required: true },
    postId: {
      type: Schema.Types.ObjectId,
      ref: PostModel,
      autopopulate: {
        maxDepth: 1,
        select: '_id',
      },
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      autopopulate: {
        maxDepth: 1,
        select: '_id',
      },
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<Chat> = chatSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<Chat> = softDeleteSchema.plugin(autoPopulate);

export type ChatDocument = Chat & Document;
export const ChatModel = model<ChatDocument>('chat', autoPopulatedSchema);
