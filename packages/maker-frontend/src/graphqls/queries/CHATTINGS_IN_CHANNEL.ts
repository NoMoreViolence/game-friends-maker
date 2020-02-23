import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ChatFullFragment } from 'graphqls/fragments';
import { ChattingsInChannel, ChattingsInChannelVariables } from './__generated__/ChattingsInChannel';
import { ChatFull } from 'graphqls/fragments/__generated__/ChatFull';
import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useMemo, useCallback, useState } from 'react';
import dayjs from 'dayjs';

export const CHATTINGS_IN_CHANNEL = gql`
  ${ChatFullFragment}
  query ChattingsInChannel($channelId: String!, $getChattingsPayload: GetChattingsPayload) {
    chattingsInChannel(channelId: $channelId, getChattingsPayload: $getChattingsPayload) {
      ...ChatFull
    }
  }
`;

export function useChattingsInChannel(variables: ChattingsInChannelVariables) {
  return useQuery<ChattingsInChannel, ChattingsInChannelVariables>(CHATTINGS_IN_CHANNEL, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
}

export function useFetchMoreChattingsInChannel(userChannelJoin: UserChannelJoinFull) {
  const [isFetching, setIsFetching] = useState(false);
  const { data, fetchMore } = useChattingsInChannel({ channelId: userChannelJoin.channelId });
  const chattingsInChannel = data?.chattingsInChannel ?? [];

  const fetchMoreChattings = useCallback(async () => {
    const firstChat = chattingsInChannel[0];
    if (!firstChat || isFetching) {
      return;
    }
    setIsFetching(true);
    await fetchMore({
      query: CHATTINGS_IN_CHANNEL,
      variables: {
        channelId: userChannelJoin.channelId,
        getChattingsPayload: {
          direction: -1,
          date: new Date(firstChat.createdAt),
          limit: 100,
        },
      },
      updateQuery(prevResult, { fetchMoreResult }) {
        if (!fetchMoreResult || fetchMoreResult.chattingsInChannel.length === 0) {
          return prevResult;
        }
        const { chattingsInChannel: prevMessages } = prevResult;
        const { chattingsInChannel: fetchedMessages } = fetchMoreResult;
        return { chattingsInChannel: [...fetchedMessages, ...prevMessages] };
      },
    });
    setIsFetching(false);
  }, [chattingsInChannel, fetchMore, isFetching, userChannelJoin.channelId]);

  return { fetchMoreChattings };
}

export interface PrettierChat extends ChatFull {
  isUserDifferentWithPrevious: boolean;
  isDateDifferentWithPrevious: boolean;
  isMyChat: boolean;
}
export function useChattingsPrettier(userChannelJoin: UserChannelJoinFull) {
  const { data } = useChattingsInChannel({ channelId: userChannelJoin.channelId });

  const chattings = useMemo(() => {
    if (!data) {
      const returnChat: PrettierChat[] = [];
      return returnChat;
    }

    const { chattingsInChannel } = data;
    let prevChat: ChatFull | null = null;
    let prettierChattings: PrettierChat[] = [];
    for (let i = 0; i < chattingsInChannel.length; i++) {
      const currentChat = chattingsInChannel[i];
      let isUserDifferentWithPrevious = false;
      let isDateDifferentWithPrevious = false;
      if (!prevChat) {
        prevChat = chattingsInChannel[i];
        isUserDifferentWithPrevious = true;
        isDateDifferentWithPrevious = true;
      } else {
        if (currentChat.userId !== prevChat.userId) {
          isUserDifferentWithPrevious = true;
        }

        const nowDate = dayjs(new Date(currentChat.createdAt));
        const lastDate = dayjs(new Date(prevChat.createdAt));
        if (!nowDate.isSame(lastDate, 'minute')) {
          isUserDifferentWithPrevious = true;
          isDateDifferentWithPrevious = true;
        }
        prevChat = currentChat;
      }

      prettierChattings.unshift({
        ...currentChat,
        isUserDifferentWithPrevious,
        isDateDifferentWithPrevious,
        isMyChat: currentChat.userId === userChannelJoin.userId,
      });
    }
    return prettierChattings;
  }, [data, userChannelJoin.userId]);

  return {
    chattings,
  };
}
