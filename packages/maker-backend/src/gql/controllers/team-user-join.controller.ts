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

  public async getTeamUserJoins(user: UserDocument, getTeamUserJoinPayload: GetTeamUserJoinPayload) {
    const payloadUserId = getTeamUserJoinPayload.userId;
    const payloadObjectUserId = new ObjectId(payloadUserId);
    if (payloadUserId && !payloadObjectUserId.equals(user._id)) {
      throw new ApolloError('Please request your id');
    }

    const nullableTeamUserJoin = await this.teamUserJoinService.getTeamUserJoin({ userId: user._id });
    this.commonService.nullable(nullableTeamUserJoin);

    const objectIdsPayload: { userId?: ObjectId; teamId?: ObjectId } = Object.assign(
      {},
      getTeamUserJoinPayload.userId
        ? {
            userId: new ObjectId(getTeamUserJoinPayload.userId),
          }
        : {},
      getTeamUserJoinPayload.teamId
        ? {
            teamId: new ObjectId(getTeamUserJoinPayload.teamId),
          }
        : {},
    );

    return this.teamUserJoinService.getTeamUserJoins(objectIdsPayload);
  }
}
