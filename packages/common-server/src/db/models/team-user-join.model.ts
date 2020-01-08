import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

import { ITeam } from './team.model';
import { IUser } from './user.model';

export enum ITeamUserJoinStateEnum {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
  PENDING_INVITE = 'pending-invite',
  PENDING_REQUEST = 'pending-request',
  DELETED = 'deleted',
}
export type TeamUserJoinState = 'owner' | 'admin' | 'user' | 'pending-invite' | 'pending-request' | 'deleted';

export interface ITeamUserJoin {
  _id: ObjectId;
  userId: IUser['_id'];
  teamId: ITeam['_id'];
  userState: TeamUserJoinState;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const teamUserJoinSchema: Schema<ITeamUserJoin> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
    userState: { type: Schema.Types.String, required: true, default: 'user' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<ITeamUserJoin> = teamUserJoinSchema.plugin(softDelete);

export type TeamUserJoinDocument = ITeamUserJoin & Document;
export const TeamUserJoinModel = model<TeamUserJoinDocument>('TeamUserJoins', softDeleteSchema);
