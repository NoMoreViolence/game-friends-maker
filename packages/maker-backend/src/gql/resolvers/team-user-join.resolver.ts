import { Authorized, Resolver, FieldResolver, Root, Query, Ctx, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { TeamUserJoin, User, Team } from '@gql/models';
import { UserService, TeamService, CommonService } from '@gql/services';
import { Context } from '@gql/bootstrap/session';
import { TeamController } from '@gql/controllers';
import { CreateTeamPayload } from '@gql/payloads';

@Service()
@Resolver(of => TeamUserJoin)
export class TeamUserJoinResolver {
  constructor(
    private teamController: TeamController,
    private userService: UserService,
    private teamService: TeamService,
    private commonService: CommonService,
  ) {}

  @Authorized()
  @Query(returns => [TeamUserJoin])
  public async myTeams(@Ctx() context: Context) {
    const user = await this.userService.getUserByContext(context);
    const teamUserJoins = await this.teamController.getMyTeamUserJoins(user._id);
    return teamUserJoins.map(teamUserJoin => teamUserJoin.toObject());
  }

  @Authorized()
  @Mutation(returns => TeamUserJoin)
  public async createTeam(@Ctx() context: Context, @Arg('createTeamPayload') createTeamPayload: CreateTeamPayload) {
    const user = await this.userService.getUserByContext(context);
    const teamUserJoin = await this.teamController.createTeam(user, createTeamPayload);
    return teamUserJoin.toObject();
  }

  @Authorized()
  @FieldResolver(type => User)
  async user(@Root() teamUserJoin: TeamUserJoin) {
    const nullableUser = await this.userService.getUserById(teamUserJoin.userId);
    const user = this.commonService.nullable(nullableUser);
    return user.toObject();
  }

  @Authorized()
  @FieldResolver(type => Team)
  async team(@Root() teamUserJoin: TeamUserJoin) {
    const nullableTeam = await this.teamService.getTeamById(teamUserJoin.teamId);
    const team = this.commonService.nullable(nullableTeam);
    return team.toObject();
  }
}
