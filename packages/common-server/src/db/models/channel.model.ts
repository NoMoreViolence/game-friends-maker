import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

import { ITeam } from './team.model';

export interface IChannel {
  _id: ObjectId;
  name: string;
  teamId: ITeam['_id'];
  firstChatCreatedAt: Date;
  lastChatCreatedAt: Date;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const channelSchema: Schema<IChannel> = new Schema(
  {
    name: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
    firstChatCreatedAt: { type: Schema.Types.Date, required: false, default: new Date() },
    lastChatCreatedAt: { type: Schema.Types.Date, required: false, default: new Date() },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IChannel> = channelSchema.plugin(softDelete);

export type ChannelDocument = IChannel & Document;
export const ChannelModel = model<ChannelDocument>('Channel', softDeleteSchema);
