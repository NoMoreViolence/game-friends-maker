import { useMemo } from 'react';
import dayjs from 'dayjs';
import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useChattingsInChannel } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import { ChatFull } from 'graphqls/fragments/__generated__/ChatFull';

interface PrettierChat extends ChatFull {
  isUserDifferentWithPrevious: boolean;
  isDateDifferentWithPrevious: boolean;
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
        if (!nowDate.isSame(lastDate, 'date')) {
          isUserDifferentWithPrevious = true;
          isDateDifferentWithPrevious = true;
        }
        prevChat = currentChat;
      }

      prettierChattings.push({
        ...currentChat,
        isUserDifferentWithPrevious,
        isDateDifferentWithPrevious,
      });
    }
    return prettierChattings;
  }, [data]);

  return {
    chattings,
  };
}
