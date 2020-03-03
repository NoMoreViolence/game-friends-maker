import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { UserChannelJoinModel, UserChannelJoinDocument, setter } from '@common-server';
import { UserChannelJoin } from '@gql/models';
import { CreateUserChannelJoinPayload, UserChannelJoinUpdatePayload } from '@gql/payloads';
import { CommonService } from './common.service';

@Service()
export class UserChannelJoinService {
  constructor(private commonService: CommonService) {}

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

  public async updateUserChannelJoin(userChannelJoin: UserChannelJoinDocument, payload: UserChannelJoinUpdatePayload) {
    setter<UserChannelJoinDocument>(userChannelJoin, payload);
    return userChannelJoin.save();
  }
}
