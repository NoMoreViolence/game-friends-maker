import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

export interface ITeam {
  _id: ObjectId;
  name: string;

  introduction: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const teamSchema: Schema<ITeam> = new Schema(
  {
    name: { type: String, required: true, default: "Jihoon's Game number one" },
    introduction: { type: String, required: false, default: '' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<ITeam> = teamSchema.plugin(softDelete);

export type TeamDocument = ITeam & Document;
export const TeamModel = model<TeamDocument>('Team', softDeleteSchema);
