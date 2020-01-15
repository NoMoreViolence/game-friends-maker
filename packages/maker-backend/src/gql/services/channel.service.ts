import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { ChannelModel } from '@common-server';
import { Channel } from '@gql/models';

@Service()
export class ChannelService {
  public async getChannelById(id: ObjectId) {
    return ChannelModel.findById(id).exec();
  }

  public async getChannel(args: Partial<Channel>) {
    return ChannelModel.findOne(args).exec();
  }
}
