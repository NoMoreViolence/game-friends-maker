import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

export interface GQLGenre {
  _id: ObjectId;
  name: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface DBGenre {
  _id: ObjectId;
  name: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const genreSchema: Schema<DBGenre> = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<DBGenre> = genreSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<DBGenre> = softDeleteSchema.plugin(autoPopulate);

export type GenreDocument = DBGenre & Document;
export const GenreModel = model<GenreDocument>('Genre', autoPopulatedSchema);
