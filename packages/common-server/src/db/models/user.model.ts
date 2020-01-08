import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

export interface IUser {
  _id: ObjectId;

  name: string;
  email: string;
  googleId?: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true },
    googleId: { type: String, required: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IUser> = userSchema.plugin(softDelete);

export type UserDocument = IUser & Document;
export const UserModel = model<UserDocument>('User', softDeleteSchema);
