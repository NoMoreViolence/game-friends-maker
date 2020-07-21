import gql from 'graphql-tag';
import { ChatFullFragment } from 'graphqls/fragments';
import { useMutation } from '@apollo/react-hooks';
import { SendTextChat, SendTextChatVariables } from './__generated__/SendTextChat';
import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useCallback } from 'react';
import { ObjectId } from 'bson';
import { ChattingsInChannel, ChattingsInChannelVariables } from 'graphqls/queries/__generated__/ChattingsInChannel';
import { CHATTINGS_IN_CHANNEL } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import { useUpdateUserChannelJoin } from './UPDATE_USER_CAHNNEL_JOIN';

export const SEND_TEXT_CHAT = gql`
  ${ChatFullFragment}
  mutation SendTextChat($sendTextChatPayload: SendTextChatPayload!) {
    sendTextChat(sendTextChatPayload: $sendTextChatPayload) {
      ...ChatFull
    }
  }
`;

export function useSendTextChat() {
  const [sendTextChat] = useMutation<SendTextChat, SendTextChatVariables>(SEND_TEXT_CHAT);
  return sendTextChat;
}

export function useSendTextChatOptimistic(userChannelJoin: UserChannelJoinFull) {
  const { channelId, user, userId, _id } = userChannelJoin;
  const sendTextChat = useSendTextChat();
  const { updateUserChannelJoin } = useUpdateUserChannelJoin();

  const sendTextChatOptimistic = useCallback(
    (text: string) => {
      const newChatId = new ObjectId().toHexString();
      const now = new Date();

      sendTextChat({
        variables: {
          sendTextChatPayload: {
            text,
            channelId,
            _id: newChatId,
          },
        },
        optimisticResponse: {
          sendTextChat: {
            _id: newChatId,
            text,
            type: 'TEXT',
            __typename: 'Chat',
            channelId,
            userId,
            user,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
            deleted: false,
          },
        },
        update: (cache, { data: mutationData }) => {
          const prevListData = cache.readQuery<ChattingsInChannel, ChattingsInChannelVariables>({
            query: CHATTINGS_IN_CHANNEL,
            variables: {
              channelId,
            },
          });
          if (prevListData && mutationData) {
            const { sendTextChat: newChat } = mutationData;

            const { chattingsInChannel } = prevListData;
            const prevSameMessageIndex = chattingsInChannel.findIndex((prevMessage) => prevMessage._id === newChat._id);
            if (prevSameMessageIndex < 0) {
              chattingsInChannel.push(newChat);
            } else {
              chattingsInChannel[prevSameMessageIndex] = newChat;
            }
            cache.writeQuery({
              query: CHATTINGS_IN_CHANNEL,
              variables: {
                channelId,
              },
              data: { chattingsInChannel },
            });
            updateUserChannelJoin({
              userChannelJoinId: _id,
              userChannelJoinUpdatePayload: {
                lastChatReadAt: mutationData.sendTextChat.createdAt,
              },
            });
          }
        },
      });
    },
    [_id, channelId, sendTextChat, updateUserChannelJoin, user, userId]
  );

  return sendTextChatOptimistic;
}
