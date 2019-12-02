import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

import { GQLTeam, DBTeam } from './team.model';
import { GQLUser, DBUser } from './user.model';

export interface GQLChat {
  _id: ObjectId;

  text: string;
  teamId: GQLTeam;
  userId: GQLUser;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface DBChat {
  _id: ObjectId;

  text: string;
  teamId: DBTeam['_id'];
  userId: DBUser['_id'];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const chatSchema: Schema<DBChat> = new Schema(
  {
    text: { type: String, required: true },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
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
const softDeleteSchema: Schema<DBChat> = chatSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<DBChat> = softDeleteSchema.plugin(autoPopulate);

export type ChatDocument = DBChat & Document;
export const ChatModel = model<ChatDocument>('Chat', autoPopulatedSchema);
