import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { ChannelModel, ChatModel, ChatDocument, setter } from '@common-server';
import { CreateChannelPayload } from '@gql/payloads';
import { Chat } from '@gql/models/chat';
import { GetChattingsPayload } from '@gql/payloads/get-chattings.payload';
import { DEFAULT_GET_CHATTINGS_DATE, DEFAULT_GET_CHATTINGS_LIMIT } from '@constants';

@Service()
export class ChatService {
  public async getChttings(channelId: ObjectId, option?: GetChattingsPayload) {
    if (option) {
      if (option.direction === -1) {
        return ChatModel.find()
          .where('channelId', channelId)
          .where('createdAt', option.date)
          .lt(option.date)
          .limit(DEFAULT_GET_CHATTINGS_LIMIT)
          .exec();
      }
      return ChatModel.find()
        .where('channelId', channelId)
        .where('createdAt', option.date)
        .gt(option.date)
        .limit(DEFAULT_GET_CHATTINGS_LIMIT)
        .exec();
    }
    return ChatModel.find()
      .where('channelId', channelId)
      .sort('-createdAt')
      .limit(DEFAULT_GET_CHATTINGS_LIMIT);
  }
  public async getChatById(id: ObjectId) {
    return ChatModel.findById(id).exec();
  }
  public async getChat(args: Partial<Chat>) {
    return ChatModel.findOne(args).exec();
  }

  public async sendChat(channelId: ObjectId, userId: ObjectId, text: string) {
    const chatModel = new ChatModel();
    setter(chatModel, { channelId, userId, text });
    return await chatModel.save();
  }
  public async updateChat(chatDocument: ChatDocument, text: string) {
    const chat = await chatDocument.update({ text }, { new: true }).exec();
    return chat;
  }
  public async deleteChat(chatDocument: ChatDocument) {
    return chatDocument.remove();
  }
}
