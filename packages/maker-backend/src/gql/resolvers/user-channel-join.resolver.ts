import { Authorized, Resolver, FieldResolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { UserChannelJoin, Team, User, Channel } from '@gql/models';
import { TeamService, CommonService, UserService, ChannelService } from '@gql/services';

@Service()
@Resolver(of => UserChannelJoin)
export class UserChannelJoinResolver {
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private channelService: ChannelService,
    private commonService: CommonService,
  ) {}

  @Authorized()
  @FieldResolver(type => Team)
  async team(@Root() userChannelJoin: UserChannelJoin) {
    const nullableTeam = await this.teamService.getTeamById(userChannelJoin.teamId);
    const team = this.commonService.nullable(nullableTeam);
    return team.toObject();
  }

  @Authorized()
  @FieldResolver(type => Channel)
  async channel(@Root() userChannelJoin: UserChannelJoin) {
    const nullableChannel = await this.channelService.getChannelById(userChannelJoin.channelId);
    const channel = this.commonService.nullable(nullableChannel);
    return channel.toObject();
  }

  @Authorized()
  @FieldResolver(type => User)
  async user(@Root() userChannelJoin: UserChannelJoin) {
    const nullableUser = await this.userService.getUserById(userChannelJoin.userId);
    const user = this.commonService.nullable(nullableUser);
    return user.toObject();
  }
}
