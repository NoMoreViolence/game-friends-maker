import dayjs from 'dayjs';
import { PrettierChat } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import React, { FC, useMemo } from 'react';
import { Circle, Col, Colors, Row, Span10, Span14, Span16 } from 'ui';

interface Props {
  chat: PrettierChat;
}
export const TextChat: FC<Props> = ({
  chat: { user, isMyChat, isTimeDifferentWithPrevious, isUserDifferentWithPrevious, text, updatedAt },
}) => {
  const messageTime = useMemo(() => dayjs(updatedAt).format('hh : mm A'), [updatedAt]);
  const shouldShowProfileCircle = useMemo(() => isUserDifferentWithPrevious || isTimeDifferentWithPrevious, [
    isTimeDifferentWithPrevious,
    isUserDifferentWithPrevious,
  ]);

  return (
    <Row
      pt={isTimeDifferentWithPrevious ? '4px' : '0'}
      pb="4px"
      pl="4px"
      pr="4px"
      isReversed={isMyChat}
      justifyContent={isMyChat ? 'flex-start' : 'flex-end'}
      alignItems="flex-start"
    >
      {!isMyChat && (
        <Row width={36} ml="8px" mr="8px" alignItems="flex-start">
          {shouldShowProfileCircle && (
            <Circle size={36} background={Colors.gray}>
              <Span16>{user.name.charAt(0)}</Span16>
            </Circle>
          )}
        </Row>
      )}
      <Col alignItems="flex-start" pr="4px" pl="4px" pt="4px">
        <Row borderRadius={12} pt={10} pb={10} pr={16} pl={16} background={Colors.gray}>
          <Span14 color={Colors.likeBlack}>{text}</Span14>
        </Row>
      </Col>
      {isTimeDifferentWithPrevious && (
        <Col alignItems="flex-start" pt="4px">
          <Span10 color={Colors.black}>{messageTime}</Span10>
        </Col>
      )}
    </Row>
  );
};
