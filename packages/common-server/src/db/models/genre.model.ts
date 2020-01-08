import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

export interface IGenre {
  _id: ObjectId;
  name: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const genreSchema: Schema<IGenre> = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IGenre> = genreSchema.plugin(softDelete);

export type GenreDocument = IGenre & Document;
export const GenreModel = model<GenreDocument>('Genre', softDeleteSchema);
