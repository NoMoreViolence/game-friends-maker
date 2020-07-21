import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { ChannelModel, ChannelDocument, setter } from '@common-server';
import { Channel } from '@gql/models';
import { CreateChannelPayload } from '@gql/payloads';

@Service()
export class ChannelService {
  public async getChannelById(id: ObjectId) {
    return ChannelModel.findById(id).exec();
  }

  public async getChannel(args: Partial<Channel>) {
    return ChannelModel.findOne(args).exec();
  }

  public async createChannel(payload: CreateChannelPayload) {
    const channel = await new ChannelModel(payload).save();
    return channel;
  }

  public async updateChannel(channel: ChannelDocument, payload: Partial<Channel>) {
    setter<ChannelDocument>(channel, payload);
    return channel.save();
  }
}