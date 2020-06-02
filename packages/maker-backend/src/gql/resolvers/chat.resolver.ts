import { Context } from '@gql/bootstrap/session';
import { ChatController } from '@gql/controllers';
import { User, Chat } from '@gql/models';
import { GetChattingsPayload } from '@gql/payloads';
import { CommonService, UserService } from '@gql/services';
import { ObjectId } from 'mongodb';
import { Arg, Authorized, Ctx, FieldResolver, Query, Resolver, Root, Mutation } from 'type-graphql';
import { Service } from 'typedi';
import { SendTextChatPayload } from '@gql/payloads/send-text-chat.payload';

@Service()
@Resolver((of) => Chat)
export class ChatResolver {
  constructor(
    private chatController: ChatController,
    private userService: UserService,
    private commonService: CommonService
  ) {}

  @Authorized()
  @Query((returns) => [Chat])
  public async chattingsInChannel(
    @Ctx() context: Context,
    @Arg('channelId') channelId: string,
    @Arg('getChattingsPayload', { nullable: true }) getChattingsPayload?: GetChattingsPayload
  ) {
    const user = await this.userService.getUserByContext(context);
    const chattings = await this.chatController.chattingsInChannel(
      new ObjectId(channelId),
      user._id,
      getChattingsPayload
    );
    return chattings;
  }

  @Authorized()
  @Mutation((returns) => Chat)
  public async sendTextChat(
    @Ctx() context: Context,
    @Arg('sendTextChatPayload') sendTextChatPayload: SendTextChatPayload
  ) {
    const user = await this.userService.getUserByContext(context);
    const chat = await this.chatController.sendTextChat(
      new ObjectId(sendTextChatPayload.channelId),
      user._id,
      new ObjectId(sendTextChatPayload._id),
      sendTextChatPayload.text
    );
    return chat.toObject();
  }

  @Authorized()
  @FieldResolver((type) => User)
  async user(@Root() chat: Chat) {
    const nullableUser = await this.userService.getUserById(chat.userId);
    const user = this.commonService.nullable(nullableUser);
    return user.toObject();
  }
}
