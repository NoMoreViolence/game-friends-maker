import { Authorized, Ctx, Resolver, Mutation, Arg, Query } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { UserService } from '@gql/services';
import { Context } from '@gql/bootstrap/session';
import { Team, TeamUserJoin } from '@gql/models';
import { CreateTeamPayload, UpdateTeamPayload, GetTeamsPayload, GetTeamsOptionPayload } from '@gql/payloads';
import { TeamController } from '@gql/controllers';
import { CreateTeam } from '@gql/object-types';

@Service()
@Resolver(type => Team)
export class TeamResolver {
  constructor(private teamController: TeamController, private userService: UserService) {}

  // TODO:
  @Authorized()
  @Query(returns => [Team])
  public async team(
    @Ctx() context: Context,
    @Arg('getTeamsPayload') getTeamsPayload: GetTeamsPayload,
    @Arg('option', { nullable: true }) option?: GetTeamsOptionPayload,
  ) {
    const teams = await this.teamController.getTeams(getTeamsPayload, option);
    return teams.map(team => team.toObject());
  }

  @Authorized()
  @Query(returns => [Team])
  public async teams(
    @Ctx() context: Context,
    @Arg('getTeamsPayload') getTeamsPayload: GetTeamsPayload,
    @Arg('option', { nullable: true }) option?: GetTeamsOptionPayload,
  ) {
    const teams = await this.teamController.getTeams(getTeamsPayload, option);
    return teams.map(team => team.toObject());
  }

  // TODO:
  @Authorized()
  @Query(returns => [TeamUserJoin])
  public async myTeams(
    @Ctx() context: Context,
    @Arg('getTeamsPayload') getTeamsPayload: GetTeamsPayload,
    @Arg('option', { nullable: true }) option?: GetTeamsOptionPayload,
  ) {
    const teams = await this.teamController.getTeams(getTeamsPayload, option);
    return teams.map(team => team.toObject());
  }

  @Authorized()
  @Mutation(returns => CreateTeam)
  public async createTeam(@Ctx() context: Context, @Arg('createTeamPayload') createTeamPayload: CreateTeamPayload) {
    const user = await this.userService.getUserByContext(context, false);
    const { team, teamUserJoin } = await this.teamController.createTeam(user, createTeamPayload);
    return {
      team: team.toObject(),
      teamUserJoin: teamUserJoin.toObject(),
      owner: user.toObject(),
    };
  }

  @Authorized()
  @Mutation(returns => Team)
  public async updateTeam(
    @Ctx() context: Context,
    @Arg('teamId') teamId: string,
    @Arg('nextTeam') nextTeam: UpdateTeamPayload,
  ) {
    const user = await this.userService.getUserByContext(context, false);
    const team = await this.teamController.updateTeam(user, new ObjectId(teamId), nextTeam);
    return team.toObject();
  }
}
