import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';
import softDelete from 'mongoosejs-soft-delete';

export interface IChannel {
  _id: ObjectId;
  name: string;

  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const channelSchema: Schema<IChannel> = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
const softDeleteSchema: Schema<IChannel> = channelSchema.plugin(softDelete);

export type ChannelDocument = IChannel & Document;
export const ChannelModel = model<ChannelDocument>('Channel', softDeleteSchema);
