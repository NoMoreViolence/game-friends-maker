import { Service } from 'typedi';
import { ObjectId } from 'bson';
import { UserDocument, ITeamUserJoinStateEnum, TeamUserJoinDocument, TeamDocument } from '@common-server';
import {
  TeamService,
  CommonService,
  GameService,
  TeamUserJoinService,
  ChannelService,
  UserChannelJoinService,
  ChatService,
} from '@gql/services';
import { UpdateTeamPayload, CreateTeamPayload, GetTeamsPayload, GetTeamsOptionPayload, Sort } from '@gql/payloads';

@Service()
export class TeamController {
  constructor(
    private teamService: TeamService,
    private teamUserJoinService: TeamUserJoinService,
    private gameService: GameService,
    private channelService: ChannelService,
    private userChannelJoinService: UserChannelJoinService,
    private chatService: ChatService,
    private commonService: CommonService,
  ) {}

  public async getTeams(payload: GetTeamsPayload, option?: GetTeamsOptionPayload) {
    const { offsetId, sort = Sort.DESC } = option || {};
    const objectOffsetId = offsetId ? new ObjectId(offsetId) : new ObjectId();
    const teams = await this.teamService.getTeams(payload, {
      offsetId: objectOffsetId,
      sort,
    });
    return teams;
  }

  public async getMyTeamUserJoins(user: UserDocument) {
    const teamUserJoins = await this.teamUserJoinService.getTeamUserJoins({ userId: user._id });
    return teamUserJoins;
  }

  public async createTeam(user: UserDocument, payload: CreateTeamPayload): Promise<TeamUserJoinDocument> {
    const nullableGame = await this.gameService.getGame({ name: payload.gameName });
    const game = this.commonService.nullable(nullableGame);
    const team = await this.teamService.createTeam({
      name: payload.name,
      introduction: payload.introduction,
      gameId: game._id,
    });
    const teamUserJoin = await this.teamUserJoinService.createTeamUserJoin({
      userId: user._id,
      teamId: team._id,
      userState: ITeamUserJoinStateEnum.OWNER,
    });
    const channel = await this.channelService.createChannel({ teamId: team._id, name: 'communication' });
    const fisrtChannelMessage = await this.chatService.sendChat(
      channel._id,
      user._id,
      new ObjectId(),
      `Channel Created by ${user.name}`,
      'SYSTEM',
    );
    const userChannelJoin = await this.userChannelJoinService.createUserChannelJoin({
      teamId: team._id,
      userId: user._id,
      channelId: channel._id,
    });
    await this.channelService.updateChannel(channel, {
      firstChatCreatedAt: fisrtChannelMessage.createdAt,
      lastChatCreatedAt: fisrtChannelMessage.createdAt,
    });
    await this.userChannelJoinService.updateUserChannelJoin(userChannelJoin, {
      firstChatReadAt: fisrtChannelMessage.createdAt,
      lastChatReadAt: fisrtChannelMessage.createdAt,
    });
    return teamUserJoin;
  }

  public async updateTeam(user: UserDocument, teamId: ObjectId, nextTeam: UpdateTeamPayload): Promise<TeamDocument> {
    const nullableTeamUserJoin = await this.teamUserJoinService.getTeamUserJoin({
      userId: user._id,
      teamId: new ObjectId(teamId),
      userState: ITeamUserJoinStateEnum.OWNER,
    });
    const teamUserJoin = this.commonService.nullable(nullableTeamUserJoin);
    const nullableTeam = await this.teamService.getTeamById(teamUserJoin.teamId);
    const team = this.commonService.nullable(nullableTeam);
    return this.teamService.updateTeam(team, nextTeam);
  }
}
