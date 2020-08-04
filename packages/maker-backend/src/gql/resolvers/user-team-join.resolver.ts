import { Context } from '@gql/bootstrap/session';
import { TeamController, TeamUserJoinController } from '@gql/controllers';
import { Team, UserTeamJoin, User } from '@gql/models';
import { CommonService, TeamService, UserService } from '@gql/services';
import { ObjectId } from 'mongodb';
import { Arg, Authorized, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(UserTeamJoin)
export class TeamUserJoinResolver {
  constructor(
    private teamController: TeamController,
    private userService: UserService,
    private teamService: TeamService,
    private commonService: CommonService,
    private teamUserJoinController: TeamUserJoinController
  ) {}

  @Authorized()
  @Query(() => [UserTeamJoin])
  public async myTeamUserJoins(@Ctx() context: Context) {
    const user = await this.userService.getUserByContext(context);
    const teamUserJoins = await this.teamUserJoinController.getTeamUserJoinsByUser(user);
    return teamUserJoins.map((userTeamJoin) => userTeamJoin.toObject());
  }

  @Authorized()
  @Query(() => [UserTeamJoin])
  public async teamUserJoins(@Ctx() context: Context, @Arg('teamId') teamId: string) {
    const user = await this.userService.getUserByContext(context);
    const teamUserJoins = await this.teamUserJoinController.getTeamUserJoinsByTeamId(new ObjectId(teamId), user);
    return teamUserJoins.map((userTeamJoin) => userTeamJoin.toObject());
  }

  @Authorized()
  @FieldResolver(() => User)
  async user(@Root() userTeamJoin: UserTeamJoin) {
    const nullableUser = await this.userService.getUserById(userTeamJoin.userId);
    const user = this.commonService.nullable(nullableUser);
    return user.toObject();
  }

  @Authorized()
  @FieldResolver(() => Team)
  async team(@Root() userTeamJoin: UserTeamJoin) {
    const nullableTeam = await this.teamService.getTeamById(userTeamJoin.teamId);
    const team = this.commonService.nullable(nullableTeam);
    return team.toObject();
  }
}
