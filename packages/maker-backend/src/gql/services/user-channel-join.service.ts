import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { UserChannelJoinModel } from '@common-server';
import { UserChannelJoin } from '@gql/models';

@Service()
export class UserChannelJoinService {
  public async getUserChannelJoinById(id: ObjectId) {
    return UserChannelJoinModel.findById(id).exec();
  }

  public async getUserChannelJoin(args: Partial<UserChannelJoin>) {
    return UserChannelJoinModel.findOne(args).exec();
  }
}
