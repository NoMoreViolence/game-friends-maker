import { Context } from '@gql/bootstrap/session';
import { TeamController, TeamUserJoinController } from '@gql/controllers';
import { Team, TeamUserJoin, User } from '@gql/models';
import { CreateTeamPayload } from '@gql/payloads';
import { CommonService, TeamService, UserService } from '@gql/services';
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { ObjectId } from 'mongodb';

@Service()
@Resolver(() => TeamUserJoin)
export class TeamUserJoinResolver {
  constructor(
    private teamController: TeamController,
    private userService: UserService,
    private teamService: TeamService,
    private commonService: CommonService,
    private teamUserJoinController: TeamUserJoinController
  ) {}

  @Authorized()
  @Query(() => [TeamUserJoin])
  public async myTeamUserJoins(@Ctx() context: Context) {
    const user = await this.userService.getUserByContext(context);
    const teamUserJoins = await this.teamUserJoinController.getTeamUserJoinsByUser(user);
    return teamUserJoins.map((teamUserJoin) => teamUserJoin.toObject());
  }

  @Authorized()
  @Query(() => [TeamUserJoin])
  public async teamUserJoins(@Ctx() context: Context, @Arg('teamId') teamId: string) {
    const user = await this.userService.getUserByContext(context);
    const teamUserJoins = await this.teamUserJoinController.getTeamUserJoinsByTeamId(new ObjectId(teamId), user);
    return teamUserJoins.map((teamUserJoin) => teamUserJoin.toObject());
  }

  @Authorized()
  @FieldResolver(() => User)
  async user(@Root() teamUserJoin: TeamUserJoin) {
    const nullableUser = await this.userService.getUserById(teamUserJoin.userId);
    const user = this.commonService.nullable(nullableUser);
    return user.toObject();
  }

  @Authorized()
  @FieldResolver(() => Team)
  async team(@Root() teamUserJoin: TeamUserJoin) {
    const nullableTeam = await this.teamService.getTeamById(teamUserJoin.teamId);
    const team = this.commonService.nullable(nullableTeam);
    return team.toObject();
  }
}
