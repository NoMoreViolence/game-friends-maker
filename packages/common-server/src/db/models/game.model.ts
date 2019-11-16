import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';
import { IGenre } from './genre.model';

export interface IGame {
  _id: ObjectId;
  name: string;

  genres: IGenre['_id'];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const gameSchema: Schema<IGame> = new Schema(
  {
    name: { type: String, required: true },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        autopopulate: {
          maxDepth: 1,
          select: '_id name',
        },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IGame> = gameSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<IGame> = softDeleteSchema.plugin(autoPopulate);

export type GameDocument = IGame & Document;
export const GameModel = model<GameDocument>('Game', autoPopulatedSchema);
