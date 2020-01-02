import { Service } from 'typedi';
import { ObjectId } from 'bson';
import { UserDocument, TeamUserJoinStateEnum } from '@common-server';
import { TeamService, CommonService, GameService } from '@gql/services';
import { UpdateTeamPayload, CreateTeamPayload, GetTeamsPayload, GetTeamsOptionPayload, Sort } from '@gql/payloads';

@Service()
export class TeamController {
  constructor(
    private teamService: TeamService,
    private gameService: GameService,
    private commonService: CommonService,
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
    const teamUserJoins = await this.teamService.getTeamUserJoins({ userId: user._id });
    return teamUserJoins;
  }

  public async createTeam(user: UserDocument, payload: CreateTeamPayload) {
    const nullableGame = await this.gameService.getGame({ name: payload.gameName });
    const game = this.commonService.nullable(nullableGame);
    const team = await this.teamService.createTeam({ ...payload, gameId: game._id });
    const teamUserJoin = await this.teamService.createTeamUserJoin({
      userId: user._id,
      teamId: team._id,
      userState: TeamUserJoinStateEnum.OWNER,
    });
    return { team, teamUserJoin };
  }

  public async updateTeam(user: UserDocument, teamId: ObjectId, nextTeam: UpdateTeamPayload) {
    const nullableTeamUserJoin = await this.teamService.getTeamUserJoin(
      {
        userId: user._id,
        teamId: new ObjectId(teamId),
        userState: TeamUserJoinStateEnum.OWNER,
      },
      false,
    );
    const teamUserJoin = this.commonService.nullable(nullableTeamUserJoin);
    const nullableTeam = await this.teamService.getTeamById(teamUserJoin.teamId);
    const team = this.commonService.nullable(nullableTeam);
    return this.teamService.updateTeam(team, nextTeam);
  }
}
