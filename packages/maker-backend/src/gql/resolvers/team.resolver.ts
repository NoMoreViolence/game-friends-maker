import { Context } from '@gql/bootstrap/session';
import { TeamController } from '@gql/controllers';
import { Team } from '@gql/models';
import { GetTeamsOptionPayload, GetTeamsPayload, UpdateTeamPayload } from '@gql/payloads';
import { CommonService, UserService } from '@gql/services';
import { ObjectId } from 'mongodb';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver((type) => Team)
export class TeamResolver {
  constructor(
    private teamController: TeamController,
    private userService: UserService,
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
}
