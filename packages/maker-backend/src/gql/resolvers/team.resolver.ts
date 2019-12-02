import { Authorized, Ctx, Resolver, Mutation, Arg, Query } from 'type-graphql';
import { DBTeam } from '@common-server';
import { Service } from 'typedi';
import { UserService, TeamService, CommonService } from '@gql/services';
import { Context } from '@gql/bootstrap/session';
import { Team } from '@gql/models';
import {
  CreateTeamPayload,
  UpdateTeamPayload,
  GetTeamsPayload,
  GetTeamsOptionPayload,
  GetTeamPayload,
  Sort,
} from '@gql/payloads';
import { ObjectId } from 'mongodb';
import { TeamController } from '@gql/controllers';

@Service()
@Resolver(type => Team)
export class TeamResolver {
  constructor(
    private userService: UserService,
    private teamController: TeamController,
    private teamService: TeamService,
    private commonService: CommonService,
  ) {}

  @Authorized()
  @Query(returns => Team)
  public async team(@Ctx() context: Context, @Arg('getTeam') getTeam: GetTeamPayload) {
    const nullableTeam = await this.teamService.getTeam(getTeam);
    return this.commonService.nullable(nullableTeam);
  }

  @Authorized()
  @Query(returns => [Team])
  public async teams(
    @Ctx() context: Context,
    @Arg('getTeam') getTeam: GetTeamsPayload,
    @Arg('option', { nullable: true }) option?: GetTeamsOptionPayload,
  ) {
    const { offsetId, sort = Sort.DESC } = option || {};
    const objectOffsetId = offsetId ? new ObjectId(offsetId) : new ObjectId();
    const payload: Partial<DBTeam> = {};
    if (payload.name) {
      payload.name = getTeam.name;
    }
    if (getTeam.authorId) {
      payload.authorId = new ObjectId(getTeam.authorId);
    }

    return (await this.teamService.getTeams(payload, {
      offsetId: objectOffsetId,
      sort,
    })).map(team => team.toObject());
  }

  @Authorized()
  @Mutation(returns => Team)
  public async createTeam(@Ctx() context: Context, @Arg('newTeam') newTeam: CreateTeamPayload) {
    const user = await this.userService.getUserByContext(context, false);
    const team = await this.teamController.createTeam(user, newTeam);
    return { ...team.toObject(), authorId: user.toObject() };
  }

  @Authorized()
  @Mutation(returns => Team)
  public async updateTeam(
    @Ctx() context: Context,
    @Arg('teamId') teamId: string,
    @Arg('nextTeam') nextTeam: UpdateTeamPayload,
  ) {
    const user = await this.userService.getUserByContext(context, false);
    return (await this.teamController.updateTeam(user, new ObjectId(teamId), nextTeam)).toObject();
  }

  @Authorized()
  @Mutation(returns => Team)
  public async joinTeam(@Ctx() context: Context, @Arg('teamId') teamId: string) {
    const requestee = await this.userService.getUserByContext(context);
    const team = await this.teamController.joinTeam(requestee, new ObjectId(teamId));
    const notNullTeam = this.commonService.nullable(team);
    return notNullTeam.toObject();
  }

  @Authorized()
  @Mutation(returns => Team)
  public async deleteTeam(@Ctx() context: Context, @Arg('teamId') teamId: string) {
    const user = await this.userService.getUserByContext(context);
    return (await this.teamController.deleteTeam(user, new ObjectId(teamId))).toObject();
  }
}
