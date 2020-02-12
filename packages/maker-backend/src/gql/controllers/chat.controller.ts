import { ChatDocument } from '@common-server';
import { GetChattingsPayload } from '@gql/payloads';
import {
  ChannelService,
  CommonService,
  GameService,
  TeamService,
  TeamUserJoinService,
  UserChannelJoinService,
  ChatService,
} from '@gql/services';
import { ObjectId } from 'bson';
import { Service } from 'typedi';
import { ApolloError } from 'apollo-server';

@Service()
export class ChatController {
  constructor(
    private teamService: TeamService,
    private teamUserJoinService: TeamUserJoinService,
    private gameService: GameService,
    private channelService: ChannelService,
    private userChannelJoinService: UserChannelJoinService,
    private chatService: ChatService,
    private commonService: CommonService,
  ) {}

  public async chattingsInChannel(
    channelId: ObjectId,
    userId: ObjectId,
    getChattingsPayload?: GetChattingsPayload,
  ): Promise<ChatDocument[]> {
    const userChannelJoin = await this.userChannelJoinService.getUserChannelJoin({ channelId, userId });
    if (!userChannelJoin) {
      throw new ApolloError('You are not in this channel');
    }
    return this.chatService.getChattings(channelId, getChattingsPayload);
  }

  public async sendTextChat(channelId: ObjectId, userId: ObjectId, chatId: ObjectId, text: string) {
    const userChannelJoin = await this.userChannelJoinService.getUserChannelJoin({ channelId, userId });
    if (!userChannelJoin) {
      throw new ApolloError('You are not in this channel');
    }
    return this.chatService.sendChat(channelId, userId, chatId, text);
  }
}
