import { ObjectId } from 'mongodb';
import { Document, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface UserInDB {
  name: string;
  email: string;
  googleId: string;

  deleted_at?: Date;
  // auto generated
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}
export type UserArgs = Pick<UserInDB, 'email' | 'googleId' | 'name'>;

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: false },
    email: {
      type: String,
      required: true,
      unique: true,
      // eslint-disable-next-line max-len
      match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    googleId: { type: String, required: false, unique: true },
    // assigned by server
    deleted_at: { type: Date, required: false, unique: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export type UserDocument = Document & UserInDB;
userSchema.index({ _id: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

userSchema.plugin(uniqueValidator);
userSchema.set('toObject', { getters: true, virtuals: true });

export const UserModel = model<UserDocument>('users', userSchema);
