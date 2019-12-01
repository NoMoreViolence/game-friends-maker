import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';
import { DBPost, GQLPost } from './post.model';

export interface GQLUser {
  _id: ObjectId;

  name: string;
  email: string;
  googleId?: string;

  posts: GQLPost[];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface DBUser {
  _id: ObjectId;

  name: string;
  email: string;
  googleId?: string;

  posts: Array<DBPost['_id']>;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const userSchema: Schema<DBUser> = new Schema(
  {
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true },
    googleId: { type: String, required: false },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        autopopulate: {
          maxDepth: 2,
          select: '_id name gameId pendingPeopleIds relatedPeopleIds introduction limit createdAt updatedAt',
        },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<DBUser> = userSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<DBUser> = softDeleteSchema.plugin(autoPopulate);

export type UserDocument = DBUser & Document;
export const UserModel = model<UserDocument>('User', autoPopulatedSchema);
