import { PrettierChat } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import React, { FC } from 'react';
import { Colors, Row, Span10 } from 'ui';

interface Props {
  chat: PrettierChat;
}
export const SystemChat: FC<Props> = ({ chat: { text } }) => {
  return (
    <Row padding="4px" justifyContent="center" alignItems="center">
      <Span10 color={Colors.black}>{text}</Span10>
    </Row>
  );
};
