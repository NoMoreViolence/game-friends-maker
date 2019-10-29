import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';
import { Post } from './post.model';

export interface User extends Document {
  _id: ObjectId;

  userTokenId: string;
  name: string;
  email: string;
  googleId?: string;

  posts: Post['_id'];

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
    posts: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      autopopulate: {
        maxDepth: 1,
        select: '_id name email gameId relatedPeopleIds limit',
      },
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<User> = userSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<User> = softDeleteSchema.plugin(autoPopulate);

export type UserDocument = User & Document;
export const UserModel = model<UserDocument>('User', autoPopulatedSchema);
