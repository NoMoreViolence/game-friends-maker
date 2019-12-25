import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

import { GQLGame, DBGame } from './game.model';

export interface GQLTeam {
  _id: ObjectId;
  name: string;

  gameId: GQLGame;

  introduction: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface DBTeam {
  _id: ObjectId;
  name: string;

  gameId: DBGame['_id'];

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
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<DBTeam> = teamSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<DBTeam> = softDeleteSchema.plugin(autoPopulate);

export type TeamDocument = DBTeam & Document;
export const TeamModel = model<TeamDocument>('Team', autoPopulatedSchema);
