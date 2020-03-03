import { UserDocument } from '@common-server';
import { UserChannelJoinUpdatePayload } from '@gql/payloads';
import { CommonService, UserChannelJoinService } from '@gql/services';
import { ObjectId } from 'bson';
import { Service } from 'typedi';

@Service()
export class UserChannelJoinController {
  constructor(private userChannelJoinService: UserChannelJoinService, private commonService: CommonService) {}

  public async updateUserChannelJoin(
    user: UserDocument,
    userChannelJoinId: ObjectId,
    userChannelJoinUpdatePayload: UserChannelJoinUpdatePayload,
  ) {
    const nullableUserChannelJoin = await this.userChannelJoinService.getUserChannelJoin({
      userId: user._id,
      _id: userChannelJoinId,
    });
    const userChannelJoin = this.commonService.nullable(nullableUserChannelJoin);
    return this.userChannelJoinService.updateUserChannelJoin(userChannelJoin, userChannelJoinUpdatePayload);
  }
}
