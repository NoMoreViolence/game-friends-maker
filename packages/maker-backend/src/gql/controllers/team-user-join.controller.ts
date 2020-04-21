import { UserDocument } from '@common-server';
import { GetTeamUserJoinPayload } from '@gql/payloads';
import { CommonService, TeamUserJoinService, UserChannelJoinService } from '@gql/services';
import { ApolloError } from 'apollo-server';
import { ObjectId } from 'bson';
import { Service } from 'typedi';

@Service()
export class TeamUserJoinController {
  constructor(
    private userChannelJoinService: UserChannelJoinService,
    private teamUserJoinService: TeamUserJoinService,
    private commonService: CommonService,
  ) {}

  public async getTeamUserJoins(user: UserDocument) {
    return this.teamUserJoinService.getTeamUserJoins({ userId: user._id });
  }
}
