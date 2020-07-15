import { ObjectId } from 'mongodb';
import { Document, model, Schema } from 'mongoose';
import softDelete from 'mongoosejs-soft-delete';
import { ITeam } from './team.model';
import { IUser } from './user.model';

export enum IUserTeamJoinStateEnum {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
  PENDING_INVITE = 'pending-invite',
  PENDING_REQUEST = 'pending-request',
  DELETED = 'deleted',
}
export type UserTeamJoinState = 'admin' | 'user' | 'pending-invite' | 'pending-request' | 'deleted';

export interface IUserTeamJoin {
  _id: ObjectId;
  displayName: string;
  userId: IUser['_id'];
  teamId: ITeam['_id'];
  muted: boolean; // false 나중에 작업, 프로퍼티만 생성해놓음
  userState: UserTeamJoinState;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const UserTeamJoinSchema: Schema<IUserTeamJoin> = new Schema(
  {
    displayName: { type: Schema.Types.String, required: true, default: '' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
    userState: { type: Schema.Types.String, required: true, default: 'user' },
    muted: { type: Schema.Types.Boolean, required: true, default: false },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
const softDeleteSchema: Schema<IUserTeamJoin> = UserTeamJoinSchema.plugin(softDelete);

export type UserTeamJoinDocument = IUserTeamJoin & Document;
export const UserTeamJoinModel = model<UserTeamJoinDocument>('UserTeamJoins', softDeleteSchema);
