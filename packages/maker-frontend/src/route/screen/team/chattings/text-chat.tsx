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
      pt={isTimeDifferentWithPrevious ? 4 : 0}
      pb={4}
      pl={4}
      pr={4}
      isReversed={isMyChat}
      justifyContent={isMyChat ? 'flex-start' : 'flex-end'}
      alignItems="flex-start"
    >
      {!isMyChat && (
        <Row width={36} ml={isMyChat ? 8 : 0} mr={!isMyChat ? 8 : 0} alignItems="flex-start">
          {shouldShowProfileCircle && (
            <Circle size={36} backgroundColor={Colors.primaryScale['light']}>
              <Span16>{user.name.charAt(0)}</Span16>
            </Circle>
          )}
        </Row>
      )}
      <Col alignItems="flex-start" pr={4} pl={4} pt={4}>
        <Row borderRadius={12} pt={10} pb={10} pr={16} pl={16} backgroundColor={Colors.secondary}>
          <Span14 color={Colors.white}>{text}</Span14>
        </Row>
      </Col>
      {isTimeDifferentWithPrevious && (
        <Col alignItems="flex-start" pt={4}>
          <Span10 color={Colors.black}>{messageTime}</Span10>
        </Col>
      )}
    </Row>
  );
};
