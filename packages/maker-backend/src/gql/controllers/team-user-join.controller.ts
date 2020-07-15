import { UserDocument } from '@common-server';
import { TeamUserJoinService } from '@gql/services';
import { ApolloError } from 'apollo-server';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class TeamUserJoinController {
  constructor(private teamUserJoinService: TeamUserJoinService) {}

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
