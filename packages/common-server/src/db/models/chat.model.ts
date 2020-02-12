import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

import { IChannel } from './channel.model';
import { IUser } from './user.model';

export interface IChat {
  _id: ObjectId;

  text: string;
  userId: IUser['_id'];
  channelId: IChannel['_id'];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    text: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    channelId: { type: Schema.Types.ObjectId, required: true, ref: 'Channel' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IChat> = chatSchema.plugin(softDelete);
softDeleteSchema.index({ channelId: 1, createdAt: -1 });

export type ChatDocument = IChat & Document;
export const ChatModel = model<ChatDocument>('Chat', softDeleteSchema);
