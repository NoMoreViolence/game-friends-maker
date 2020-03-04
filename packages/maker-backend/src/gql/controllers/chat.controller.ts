import { ChatDocument } from '@common-server';
import { GetChattingsPayload } from '@gql/payloads';
import { ChannelService, ChatService, CommonService, UserChannelJoinService } from '@gql/services';
import { ApolloError } from 'apollo-server';
import { ObjectId } from 'bson';
import { Service } from 'typedi';

@Service()
export class ChatController {
  constructor(
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
    const nullableChannel = await this.channelService.getChannelById(channelId);
    const channel = this.commonService.nullable(nullableChannel);

    if (!userChannelJoin) {
      throw new ApolloError('You are not in this channel');
    }
    const chat = await this.chatService.sendChat(channelId, userId, chatId, text);
    await this.channelService.updateChannel(channel, { lastChatCreatedAt: chat.createdAt });
    return chat;
  }
}
