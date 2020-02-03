import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import { Container, ScrollContainer } from 'ui';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { useChattingsInChannel, CHATTINGS_IN_CHANNEL } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import { useChattingsPrettier } from 'helpers';

interface Props {
  userChannelJoin: UserChannelJoinFull;
}
export const Messages: FC<Props> = ({ userChannelJoin }) => {
  const { fetchMore } = useChattingsInChannel({ channelId: userChannelJoin.channelId });
  const { chattings } = useChattingsPrettier(userChannelJoin);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isFetching, setIsFetching] = useState(false);
  const fetchMoreMessages = useCallback(async () => {
    const firstChat = chattings[0];
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
          date: firstChat.createdAt,
          limit: 20,
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
  }, [chattings, fetchMore, isFetching, userChannelJoin.channelId]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollSubscription = fromEvent(scrollContainerRef.current, 'scroll')
        .pipe(debounceTime(100))
        .subscribe(() => {
          const scrollTop = scrollContainerRef.current?.scrollTop ?? 9999;
          const scrollHeight = scrollContainerRef.current?.scrollHeight ?? 0;
          const clientHeight = scrollContainerRef.current?.clientHeight ?? 0;

          if (scrollHeight > clientHeight && scrollTop < 100) {
            fetchMoreMessages();
          }
        });

      return () => {
        scrollSubscription.unsubscribe();
      };
    }
  }, [fetchMoreMessages]);

  return (
    <Container>
      <ScrollContainer ref={scrollContainerRef}>
        {chattings?.map(s => (
          <div key={s._id}>{s.text}</div>
        ))}
      </ScrollContainer>
    </Container>
  );
};
