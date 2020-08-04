import { ObjectId } from 'mongodb';
import { Document, model, Schema } from 'mongoose';
import softDelete from 'mongoosejs-soft-delete';

export interface IUser {
  _id: ObjectId;

  givenName: string;
  familyName: string;
  nickName?: string;
  email: string;
  googleId?: string;

  profileImageUrl?: string;
  description?: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const userSchema: Schema<IUser> = new Schema(
  {
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    nickName: { type: String, required: false },
    description: { type: String, required: false },
    profileImageUrl: { type: String, required: false },
    email: { type: String, required: true },
    googleId: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
const softDeleteSchema: Schema<IUser> = userSchema.plugin(softDelete);

export type UserDocument = IUser & Document;
export const UserModel = model<UserDocument>('User', softDeleteSchema);
