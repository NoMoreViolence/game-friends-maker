import { Context } from '@gql/bootstrap/session';
import { TeamController } from '@gql/controllers';
import { Team } from '@gql/models';
import { CreateTeamPayload, UpdateTeamPayload } from '@gql/payloads';
import { UserService } from '@gql/services';
import { ObjectId } from 'mongodb';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(Team)
export class TeamResolver {
  constructor(private teamController: TeamController, private userService: UserService) {}

  @Authorized()
  @Mutation(() => Team)
  public async createTeam(@Ctx() context: Context, @Arg('createTeamPayload') createTeamPayload: CreateTeamPayload) {
    const user = await this.userService.getUserByContext(context);
    const team = await this.teamController.createTeam(user, createTeamPayload);
    return team.toObject();
  }

  @Authorized()
  @Mutation(() => Team)
  public async updateTeam(
    @Ctx() context: Context,
    @Arg('teamId') teamId: string,
    @Arg('nextTeam') nextTeam: UpdateTeamPayload
  ) {
    const user = await this.userService.getUserByContext(context);
    const team = await this.teamController.updateTeam(user, new ObjectId(teamId), nextTeam);
    return team.toObject();
  }
}
