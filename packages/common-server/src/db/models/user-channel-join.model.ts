import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

import { ITeam } from './team.model';
import { IUser } from './user.model';
import { IChannel } from './channel.model';

export interface IUserChannelJoin {
  _id: ObjectId;
  teamId: ITeam['_id'];
  userId: IUser['_id'];
  channelId: IChannel['_id'];
  muted: boolean; // false 나중에 작업, 프로퍼티만 생성해놓음

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const userChannelJoinSchema: Schema<IUserChannelJoin> = new Schema(
  {
    teamId: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    channelId: { type: Schema.Types.ObjectId, required: true, ref: 'Channel' },
    muted: { type: Schema.Types.Boolean, required: true, default: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IUserChannelJoin> = userChannelJoinSchema.plugin(softDelete);

export type UserChannelJoinDocument = IUserChannelJoin & Document;
export const UserChannelJoinModel = model<UserChannelJoinDocument>('UserChannelJoins', softDeleteSchema);
