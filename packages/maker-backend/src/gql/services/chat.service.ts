import { ChatDocument, ChatModel, setter, IChat } from '@common-server';
import { DEFAULT_GET_CHATTINGS_LIMIT } from '@constants';
import { Chat } from '@gql/models/chat';
import { GetChattingsPayload } from '@gql/payloads/get-chattings.payload';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class ChatService {
  public async getChattings(channelId: ObjectId, option?: GetChattingsPayload) {
    if (option) {
      return ChatModel.aggregate([
        {
          $match: {
            channelId,
            createdAt: option.direction > 0 ? { $gt: new Date(option.date) } : { $lt: new Date(option.date) },
          },
        },
        {
          $sort: {
            createdAt: option.direction,
          },
        },
        {
          $limit: option.limit,
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            createdAt: 1,
          },
        },
      ]);
    }

    return ChatModel.aggregate([
      {
        $match: {
          channelId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: DEFAULT_GET_CHATTINGS_LIMIT,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);
  }
  public async getChatById(id: ObjectId) {
    return ChatModel.findById(id).exec();
  }
  public async getChat(args: Partial<Chat>) {
    return ChatModel.findOne(args).exec();
  }

  public async sendChat(
    channelId: ObjectId,
    userId: ObjectId,
    chatId: ObjectId,
    text: string,
    type: IChat['type'] = 'TEXT',
  ) {
    const chatModel = new ChatModel();
    setter(chatModel, { _id: chatId, channelId, userId, text, type });
    return chatModel.save();
  }
  public async updateChat(chatDocument: ChatDocument, text: string) {
    const chat = await chatDocument.update({ text }, { new: true }).exec();
    return chat;
  }
  public async deleteChat(chatDocument: ChatDocument) {
    return chatDocument.remove();
  }
}
