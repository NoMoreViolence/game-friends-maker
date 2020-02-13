import { PrettierChat } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import React, { FC, useMemo } from 'react';
import { Circle, Row, Col, Span14, Colors } from 'ui';
import { Icon, iconMap } from 'helpers';

interface Props {
  chat: PrettierChat;
}
export const MessageItem: FC<Props> = ({
  chat: { isMyChat, isUserDifferentWithPrevious, isDateDifferentWithPrevious, text },
}) => {
  const shouldShowProfileCircle = useMemo(() => isUserDifferentWithPrevious || isDateDifferentWithPrevious, [
    isDateDifferentWithPrevious,
    isUserDifferentWithPrevious,
  ]);

  return (
    <Row padding={4} isReversed={isMyChat} justifyContent={isMyChat ? 'flex-start' : 'flex-end'} alignItems="flex-end">
      {isMyChat && (
        <Row width={36} ml={isMyChat ? 8 : 0} mr={!isMyChat ? 8 : 0} alignItems="flex-start">
          {shouldShowProfileCircle && (
            <Circle size={36}>
              <Icon iconClass={iconMap.defaultProfile} iconSize={36} />
            </Circle>
          )}
        </Row>
      )}
      <Col alignItems="flex-start">
        <Row borderRadius={12} pt={10} pb={10} pr={16} pl={16} backgroundColor={Colors.secondary}>
          <Span14 color={Colors.white}>{text}</Span14>
        </Row>
      </Col>
    </Row>
  );
};
