import { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { TeamDocument, UserDocument, UserModel } from '@common-server';
import { TeamService, CommonService, UserService } from '@gql/services';
import { AuthenticationError, ApolloError } from 'apollo-server';
import { UpdateTeamPayload, CreateTeamPayload } from '@gql/payloads';

@Service()
export class TeamController {
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private commonService: CommonService,
  ) {}

  public async createTeam(user: UserDocument, payload: CreateTeamPayload) {
    this.userService.checkUserCanJoinTeam(user);
    const team = await this.teamService.createTeam(user._id, payload);
    await UserModel.findOneAndUpdate({ _id: user._id }, { $addToSet: { teams: team._id } }, { new: true }).exec();
    return team;
  }

  public async updateTeam(user: UserDocument, teamId: ObjectId, nextTeam: UpdateTeamPayload) {
    const nullableTeam = await this.teamService.getTeamById(new ObjectId(teamId), false);
    const team = this.isOwner(user, nullableTeam);
    return this.teamService.updateTeam(team, nextTeam);
  }

  public async joinTeam(requestee: UserDocument, teamId: ObjectId) {
    this.userService.checkUserCanJoinTeam(requestee);
    const team = await this.teamService.getTeamById(teamId, false);
    if (!team) {
      throw new ApolloError('There is no data');
    }
    if (team.authorId.equals(requestee._id)) {
      throw new AuthenticationError('You cannot join this party');
    }

    return this.teamService.joinTeam(teamId, requestee._id);
  }

  public async deleteTeam(user: UserDocument, teamId: ObjectId) {
    const nullableTeam = await this.teamService.getTeamById(new ObjectId(teamId), false);
    const team = this.isOwner(user, nullableTeam);
    return this.teamService.deleteTeam(team);
  }

  private isOwner(user: UserDocument, nullableTeam: TeamDocument | null) {
    const team = this.commonService.nullable<TeamDocument>(nullableTeam);
    if (!team.authorId.equals(user._id)) {
      throw new AuthenticationError('You are not owner of this team');
    }
    return team;
  }
}
