import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

import { GQLTeam, DBTeam } from './team.model';
import { DBUser, GQLUser } from './user.model';

export enum TeamUserJoinStateEnum {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
  PENDING_INVITE = 'pending-invite',
  PENDING_REQUEST = 'pending-request',
  DELETED = 'deleted',
}
export type TeamUserJoinState = 'owner' | 'admin' | 'user' | 'pending-invite' | 'pending-request' | 'deleted';

export interface GQLTeamUserJoin {
  _id: ObjectId;
  userId: GQLUser;
  teamId: GQLTeam;
  userState: TeamUserJoinState;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface DBTeamUserJoin {
  _id: ObjectId;
  userId: DBUser['_id'];
  teamId: DBTeam['_id'];
  userState: TeamUserJoinState;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const teamUserJoinSchema: Schema<DBTeamUserJoin> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: {
        maxDepth: 1,
        select: '_id name email createdAt updatedAt deleted',
      },
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      autopopulate: {
        maxDepth: 3,
        select: '_id name gameId introduction createdAt updatedAt deleted',
      },
      required: true,
    },
    userState: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<DBTeamUserJoin> = teamUserJoinSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<DBTeamUserJoin> = softDeleteSchema.plugin(autoPopulate);

export type TeamUserJoinDocument = DBTeamUserJoin & Document;
export const TeamUserJoinModel = model<TeamUserJoinDocument>('TeamUserJoins', autoPopulatedSchema);
