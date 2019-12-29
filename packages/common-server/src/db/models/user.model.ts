import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

export interface GQLUser {
  _id: ObjectId;

  name: string;
  email: string;
  googleId?: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface DBUser {
  _id: ObjectId;

  name: string;
  email: string;
  googleId?: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const userSchema: Schema<DBUser> = new Schema(
  {
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true },
    googleId: { type: String, required: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<DBUser> = userSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<DBUser> = softDeleteSchema.plugin(autoPopulate);

export type UserDocument = DBUser & Document;
export const UserModel = model<UserDocument>('User', autoPopulatedSchema);
