import { Context } from '@gql/bootstrap/session';
import { UserChannelJoinController } from '@gql/controllers';
import { Channel, Team, User, UserChannelJoin } from '@gql/models';
import { UserChannelJoinUpdatePayload } from '@gql/payloads';
import { ChannelService, CommonService, TeamService, UserChannelJoinService, UserService } from '@gql/services';
import { ObjectId } from 'mongodb';
import { Arg, Authorized, Ctx, FieldResolver, Query, Resolver, Root, Mutation } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver((of) => UserChannelJoin)
export class UserChannelJoinResolver {
  constructor(
    private userChannelJoinController: UserChannelJoinController,
    private teamService: TeamService,
    private userService: UserService,
    private channelService: ChannelService,
    private userChannelJoinService: UserChannelJoinService,
    private commonService: CommonService,
  ) {}

  @Authorized()
  @Query((returns) => [UserChannelJoin])
  public async myUserChannelJoins(@Ctx() context: Context, @Arg('teamId') teamId: string) {
    const user = await this.userService.getUserByContext(context);
    const userChannelJoins = await this.userChannelJoinService.getUserChannelJoins({
      userId: user._id,
      teamId: new ObjectId(teamId),
    });
    return userChannelJoins.map((userChannelJoin) => userChannelJoin.toObject());
  }

  @Authorized()
  @Mutation((returns) => UserChannelJoin)
  public async updateUserChannelJoin(
    @Ctx() context: Context,
    @Arg('userChannelJoinId') userChannelJoinId: string,
    @Arg('userChannelJoinUpdatePayload') userChannelJoinUpdatePayload: UserChannelJoinUpdatePayload,
  ) {
    const user = await this.userService.getUserByContext(context);
    const userChannelJoin = await this.userChannelJoinController.updateUserChannelJoin(
      user,
      new ObjectId(userChannelJoinId),
      userChannelJoinUpdatePayload,
    );
    return userChannelJoin.toObject();
  }

  @Authorized()
  @FieldResolver((type) => Team)
  async team(@Root() userChannelJoin: UserChannelJoin) {
    const nullableTeam = await this.teamService.getTeamById(userChannelJoin.teamId);
    const team = this.commonService.nullable(nullableTeam);
    return team.toObject();
  }

  @Authorized()
  @FieldResolver((type) => Channel)
  async channel(@Root() userChannelJoin: UserChannelJoin) {
    const nullableChannel = await this.channelService.getChannelById(userChannelJoin.channelId);
    const channel = this.commonService.nullable(nullableChannel);
    return channel.toObject();
  }

  @Authorized()
  @FieldResolver((type) => User)
  async user(@Root() userChannelJoin: UserChannelJoin) {
    const nullableUser = await this.userService.getUserById(userChannelJoin.userId);
    const user = this.commonService.nullable(nullableUser);
    return user.toObject();
  }
}
