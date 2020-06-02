import { UserDocument } from '@common-server';
import { CommonService, TeamUserJoinService, UserChannelJoinService, TeamService } from '@gql/services';
import { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { ApolloError } from 'apollo-server';

@Service()
export class TeamUserJoinController {
  constructor(
    private userChannelJoinService: UserChannelJoinService,
    private teamService: TeamService,
    private teamUserJoinService: TeamUserJoinService,
    private commonService: CommonService
  ) {}

  public async getTeamUserJoinsByUser(user: UserDocument) {
    return this.teamUserJoinService.getTeamUserJoins({ userId: user._id });
  }

  public async getTeamUserJoinsByTeamId(teamId: ObjectId, user: UserDocument) {
    const teamUserJoin = await this.teamUserJoinService.getTeamUserJoin({ teamId, userId: user._id });
    if (!teamUserJoin) {
      throw new ApolloError(`There is no team by teamId ${teamId}`);
    }
    return this.teamUserJoinService.getTeamUserJoins({ teamId });
  }
}
