import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';
import { Genre } from './genre.model';

export interface Game extends Document {
  _id: ObjectId;
  name: string;

  genres: Genre['_id'];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const gameSchema: Schema<Game> = new Schema(
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
const softDeleteSchema: Schema<Game> = gameSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<Game> = softDeleteSchema.plugin(autoPopulate);

export type GameDocument = Game & Document;
export const GameModel = model<GameDocument>('Game', autoPopulatedSchema);