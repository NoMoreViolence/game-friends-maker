import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

import { ITeam } from './team.model';

export interface IChannel {
  _id: ObjectId;
  name: string;
  teamId: ITeam['_id'];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const channelSchema: Schema<IChannel> = new Schema(
  {
    name: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IChannel> = channelSchema.plugin(softDelete);

export type ChannelDocument = IChannel & Document;
export const ChannelModel = model<ChannelDocument>('Channel', softDeleteSchema);
