import { PrettierChat } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import React, { FC } from 'react';
import { Colors, Row, Span10 } from 'ui';

interface Props {
  chat: PrettierChat;
}
export const SystemChat: FC<Props> = ({ chat: { text } }) => {
  return (
    <Row pt={4} pb={4} pl={4} pr={4} justifyContent="center" alignItems="center">
      <Span10 color={Colors.black}>{text}</Span10>
    </Row>
  );
};
