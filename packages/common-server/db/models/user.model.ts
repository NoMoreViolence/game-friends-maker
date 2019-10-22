import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';

export interface User extends Document {
  _id: ObjectId;

  userTokenId: string;
  name: string;
  email: string;
  googleId?: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const userSchema: Schema<User> = new Schema(
  {
    userTokenId: { type: String, required: false, default: '' },
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true },
    googleId: { type: String, required: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<User> = userSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<User> = softDeleteSchema.plugin(autoPopulate);

export type UserDocument = User & Document;
export const UserModel = model<UserDocument>('users', autoPopulatedSchema);
