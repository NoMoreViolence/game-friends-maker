import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

export interface Genre extends Document {
  _id: ObjectId;
  name: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const genreSchema: Schema<Genre> = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<Genre> = genreSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<Genre> = softDeleteSchema.plugin(autoPopulate);

export type GenreDocument = Genre & Document;
export const GenreModel = model<GenreDocument>('Genre', autoPopulatedSchema);
