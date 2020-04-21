import { Authorized, Ctx, Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { UserService, GameService, CommonService } from '@gql/services';
import { Context } from '@gql/bootstrap/session';
import { Team, Game } from '@gql/models';
import { UpdateTeamPayload, GetTeamsPayload, GetTeamsOptionPayload } from '@gql/payloads';
import { TeamController } from '@gql/controllers';

@Service()
@Resolver((type) => Team)
export class TeamResolver {
  constructor(
    private teamController: TeamController,
    private userService: UserService,
    private gameService: GameService,
    private commonService: CommonService,
  ) {}

  // TODO:
  @Authorized()
  @Query((returns) => [Team])
  public async team(
    @Ctx() context: Context,
    @Arg('getTeamsPayload') getTeamsPayload: GetTeamsPayload,
    @Arg('option', { nullable: true }) option?: GetTeamsOptionPayload,
  ) {
    const teams = await this.teamController.getTeams(getTeamsPayload, option);
    return teams.map((team) => team.toObject());
  }

  @Authorized()
  @Query((returns) => [Team])
  public async teams(
    @Ctx() context: Context,
    @Arg('getTeamsPayload') getTeamsPayload: GetTeamsPayload,
    @Arg('option', { nullable: true }) option?: GetTeamsOptionPayload,
  ) {
    const teams = await this.teamController.getTeams(getTeamsPayload, option);
    return teams.map((team) => team.toObject());
  }

  @Authorized()
  @Mutation((returns) => Team)
  public async updateTeam(
    @Ctx() context: Context,
    @Arg('teamId') teamId: string,
    @Arg('nextTeam') nextTeam: UpdateTeamPayload,
  ) {
    const user = await this.userService.getUserByContext(context);
    const team = await this.teamController.updateTeam(user, new ObjectId(teamId), nextTeam);
    return team.toObject();
  }

  @Authorized()
  @FieldResolver((type) => Game)
  async game(@Root() team: Team) {
    const nullableGame = await this.gameService.getGameById(team.gameId);
    const game = this.commonService.nullable(nullableGame);
    return game.toObject();
  }
}
