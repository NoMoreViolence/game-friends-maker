import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useChattingsPrettier, useFetchMoreChattingsInChannel } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Container, ScrollContainer, Row } from 'ui';
import { ChatItem } from './chat-item';

interface Props {
  userChannelJoin: UserChannelJoinFull;
}
export const Chattings: FC<Props> = ({ userChannelJoin }) => {
  const { fetchMoreChattings } = useFetchMoreChattingsInChannel(userChannelJoin);
  const { chattings } = useChattingsPrettier(userChannelJoin);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = scrollContainerRef.current;
    if (containerElement) {
      const handler = () => {
        const { clientHeight, scrollHeight, scrollTop } = containerElement;
        const normalizedScrollHeight = scrollTop >= 0 ? scrollTop : scrollTop + scrollHeight - clientHeight;
        if (normalizedScrollHeight < 700) {
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
    <StyledContainer>
      <StyledScrollContainer ref={scrollContainerRef}>
        <Row padding={4} />
        {chattings.map((s) => (
          <ChatItem chat={s} key={s._id} />
        ))}
      </StyledScrollContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  justify-content: flex-end;
  overflow: hidden;
`;
const StyledScrollContainer = styled(ScrollContainer)`
  display: flex;
  flex-direction: column-reverse;
`;
