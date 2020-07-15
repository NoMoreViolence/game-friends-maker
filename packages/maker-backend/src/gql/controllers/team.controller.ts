import { IUserTeamJoinStateEnum, TeamDocument, UserDocument } from '@common-server';
import { CreateTeamPayload, GetTeamsOptionPayload, GetTeamsPayload, Sort, UpdateTeamPayload } from '@gql/payloads';
import { CommonService, TeamService, TeamUserJoinService } from '@gql/services';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class TeamController {
  constructor(
    private teamService: TeamService,
    private userTeamJoinService: TeamUserJoinService,
    private commonService: CommonService
  ) {}

  public async getTeams(payload: GetTeamsPayload, option?: GetTeamsOptionPayload) {
    const { offsetId, sort = Sort.DESC } = option || {};
    const objectOffsetId = offsetId ? new ObjectId(offsetId) : new ObjectId();
    const teams = await this.teamService.getTeams(payload, {
      offsetId: objectOffsetId,
      sort,
    });
    return teams;
  }

  public async getMyTeamUserJoins(user: UserDocument) {
    const teamUserJoins = await this.userTeamJoinService.getTeamUserJoins({ userId: user._id });
    return teamUserJoins;
  }

  public async createTeam(user: UserDocument, payload: CreateTeamPayload): Promise<TeamDocument> {
    const team = await this.teamService.createTeam({
      name: payload.name,
      introduction: payload.introduction,
    });
    await this.userTeamJoinService.createTeamUserJoin({
      displayName: user.name,
      userId: user._id,
      teamId: team._id,
      userState: IUserTeamJoinStateEnum.ADMIN,
    });

    return team;
  }

  public async updateTeam(user: UserDocument, teamId: ObjectId, nextTeam: UpdateTeamPayload): Promise<TeamDocument> {
    const nullableTeamUserJoin = await this.userTeamJoinService.getTeamUserJoin({
      userId: user._id,
      teamId: new ObjectId(teamId),
      userState: IUserTeamJoinStateEnum.ADMIN,
    });
    const teamUserJoin = this.commonService.nullable(nullableTeamUserJoin);
    const nullableTeam = await this.teamService.getTeamById(teamUserJoin.teamId);
    const team = this.commonService.nullable(nullableTeam);
    return this.teamService.updateTeam(team, nextTeam);
  }
}
