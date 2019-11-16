import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

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
const autoPopulatedSchema: Schema<IGenre> = softDeleteSchema.plugin(autoPopulate);

export type GenreDocument = IGenre & Document;
export const GenreModel = model<GenreDocument>('Genre', autoPopulatedSchema);
