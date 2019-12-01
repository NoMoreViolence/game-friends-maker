import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';
import { DBGenre, GQLGenre } from './genre.model';

export interface GQLGame {
  _id: ObjectId;
  name: string;

  genres: GQLGenre[];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface DBGame {
  _id: ObjectId;
  name: string;

  genres: Array<DBGenre['_id']>;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const gameSchema: Schema<DBGame> = new Schema(
  {
    name: { type: String, required: true },
    genres: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Genre',
          autopopulate: {
            maxDepth: 1,
            select: '_id name genres createdAt updatedAt',
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<DBGame> = gameSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<DBGame> = softDeleteSchema.plugin(autoPopulate);

export type GameDocument = DBGame & Document;
export const GameModel = model<GameDocument>('Game', autoPopulatedSchema);
