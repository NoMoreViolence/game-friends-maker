import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';
import { DBTeam, GQLTeam } from './team.model';

export interface GQLUser {
  _id: ObjectId;

  name: string;
  email: string;
  googleId?: string;

  teams: GQLTeam[];
  pendingTeams: GQLTeam[];
  relatedTeams: GQLTeam[];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface DBUser {
  _id: ObjectId;

  name: string;
  email: string;
  googleId?: string;

  teams: Array<DBTeam['_id']>;
  pendingTeams: Array<DBTeam['_id']>;
  relatedTeams: Array<DBTeam['_id']>;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const userSchema: Schema<DBUser> = new Schema(
  {
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true },
    googleId: { type: String, required: false },
    teams: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Team',
          autopopulate: {
            maxDepth: 2,
            select: '_id name gameId pendingPeopleIds relatedPeopleIds introduction limit createdAt updatedAt',
          },
        },
      ],
    },
    pendingTeams: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Team',
          autopopulate: {
            maxDepth: 2,
            select: '_id name gameId pendingPeopleIds relatedPeopleIds introduction limit createdAt updatedAt',
          },
        },
      ],
    },
    relatedTeams: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Team',
          autopopulate: {
            maxDepth: 2,
            select: '_id name gameId pendingPeopleIds relatedPeopleIds introduction limit createdAt updatedAt',
          },
        },
      ],
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<DBUser> = userSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<DBUser> = softDeleteSchema.plugin(autoPopulate);

export type UserDocument = DBUser & Document;
export const UserModel = model<UserDocument>('User', autoPopulatedSchema);
