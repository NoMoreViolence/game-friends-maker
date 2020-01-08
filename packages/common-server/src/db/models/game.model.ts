import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import { IGenre } from './genre.model';

export interface IGame {
  _id: ObjectId;
  name: string;

  genreIds: IGenre['_id'][];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const gameSchema: Schema<IGame> = new Schema(
  {
    name: { type: String, required: true },
    genreIds: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
      default: [],
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IGame> = gameSchema.plugin(softDelete);

export type GameDocument = IGame & Document;
export const GameModel = model<GameDocument>('Game', softDeleteSchema);
