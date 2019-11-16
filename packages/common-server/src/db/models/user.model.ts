import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';
import autoPopulate from 'mongoose-autopopulate';
import { IPost } from './post.model';

export interface IUser {
  _id: ObjectId;

  name: string;
  email: string;
  googleId?: string;

  posts: IPost['_id'];

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true },
    googleId: { type: String, required: false },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        autopopulate: {
          maxDepth: 1,
          select: '_id name email gameId relatedPeopleIds limit',
        },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IUser> = userSchema.plugin(softDelete);
const autoPopulatedSchema: Schema<IUser> = softDeleteSchema.plugin(autoPopulate);

export type UserDocument = IUser & Document;
export const UserModel = model<UserDocument>('User', autoPopulatedSchema);
