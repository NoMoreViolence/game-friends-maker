import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { UserChannelJoinModel } from '@common-server';
import { UserChannelJoin } from '@gql/models';
import { CreateUserChannelJoinPayload } from '@gql/payloads';

@Service()
export class UserChannelJoinService {
  public async getUserChannelJoinById(id: ObjectId) {
    return UserChannelJoinModel.findById(id).exec();
  }

  public async getUserChannelJoin(args: Partial<UserChannelJoin>) {
    return UserChannelJoinModel.findOne(args).exec();
  }

  public async getUserChannelJoins(args: Partial<UserChannelJoin>) {
    return UserChannelJoinModel.find(args).exec();
  }

  public async createUserChannelJoin(payload: CreateUserChannelJoinPayload) {
    const userChannelJoin = await new UserChannelJoinModel(payload).save();
    return userChannelJoin;
  }
}
