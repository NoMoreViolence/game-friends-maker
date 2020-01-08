import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

import { ITeam } from './team.model';
import { IUser } from './user.model';

export interface IChat {
  _id: ObjectId;

  text: string;
  teamId: ITeam['_id'];
  userId: IUser['_id'];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    text: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IChat> = chatSchema.plugin(softDelete);

export type ChatDocument = IChat & Document;
export const ChatModel = model<ChatDocument>('Chat', softDeleteSchema);
