import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useChattingsPrettier, useFetchMoreChattingsInChannel } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Container, ScrollContainer } from 'ui';
import { MessageItem } from './message-item';

interface Props {
  userChannelJoin: UserChannelJoinFull;
}
export const Messages: FC<Props> = ({ userChannelJoin }) => {
  const { fetchMoreChattings } = useFetchMoreChattingsInChannel(userChannelJoin);
  const { chattings } = useChattingsPrettier(userChannelJoin);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = scrollContainerRef.current;
    if (containerElement) {
      const handler = () => {
        const scrollTop = containerElement.scrollTop ?? 9999;
        const scrollHeight = containerElement.scrollHeight ?? 0;
        const clientHeight = containerElement?.clientHeight ?? 0;

        if (scrollHeight > clientHeight && scrollTop < 100) {
          fetchMoreChattings();
        }
      };

      containerElement.addEventListener('scroll', handler);
      return () => {
        containerElement.removeEventListener('scroll', handler);
      };
    }
  }, [fetchMoreChattings]);

  return (
    <StyledContainer contentStartLocation="bottom">
      <ScrollContainer ref={scrollContainerRef}>
        {chattings?.map(s => (
          <MessageItem chat={s} key={s._id} />
        ))}
      </ScrollContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  overflow: hidden;
`;
