import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

import { GQLGame, DBGame } from './game.model';
import { DBUser, GQLUser } from './user.model';

export interface GQLTeam {
  _id: ObjectId;
  name: string;

  gameId: GQLGame;
  authorId: GQLUser;
  pendingPeopleIds: GQLUser[];
  relatedPeopleIds: GQLUser[];

  introduction: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface DBTeam {
  _id: ObjectId;
  name: string;

  gameId: DBGame['_id'];
  authorId: DBUser['_id'];
  pendingPeopleIds: Array<DBUser['_id']>;
  relatedPeopleIds: Array<DBUser['_id']>;

  introduction: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const teamSchema: Schema<DBTeam> = new Schema(
  {
    name: { type: String, required: true, default: "Jihoon's Game number one" },
    introduction: { type: String, required: false, default: '' },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      autopopulate: {
        maxDepth: 3,
        select: '_id name genres createdAt updatedAt',
      },
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: {
        maxDepth: 1,
        select: '_id name email createdAt updatedAt',
      },
      required: true,
    },
    pendingPeopleIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
          autopopulate: {
            maxDepth: 1,
            select: '_id name email createdAt updatedAt',
          },
        },
      ],
      default: [],
    },
    relatedPeopleIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
          autopopulate: {
            maxDepth: 1,
            select: '_id name email createdAt updatedAt',
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<DBTeam> = teamSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<DBTeam> = softDeleteSchema.plugin(autoPopulate);

export type TeamDocument = DBTeam & Document;
export const TeamModel = model<TeamDocument>('Team', autoPopulatedSchema);
