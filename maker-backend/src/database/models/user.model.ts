import { Document, Schema, model } from 'mongoose';
import softDelete from 'mongoosejs-soft-delete';
import { ObjectId } from 'bson';

export interface User extends Document {
  _id: ObjectId;
  userTokenId: string;
  name: string;
  email: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    userTokenId: { type: String, required: false, default: '' },
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true },
    googleId: { type: String, required: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
userSchema.plugin(softDelete);

export type UserDocument = User & Document;
export const UserModel = model<UserDocument>('users', userSchema);
