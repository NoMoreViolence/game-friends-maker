import dayjs from 'dayjs';
import { PrettierChat } from 'graphqls/queries/CHATTINGS_IN_CHANNEL';
import React, { FC } from 'react';
import { Col, Colors, Row, Span12 } from 'ui';
import { SystemChat } from './sys-chat';
import { TextChat } from './text-chat';

interface Props {
  chat: PrettierChat;
}
export const ChatItem: FC<Props> = ({ chat, chat: { type, isDateDifferentWithPrevious, createdAt, updatedAt } }) => {
  return (
    <Col alignItems="stretch">
      {isDateDifferentWithPrevious && (
        <Row
          pt={4}
          pb={4}
          borderBottomWidth={1}
          borderWidth={0}
          borderStyle="solid"
          borderColor={Colors.black}
          justifyContent="center"
        >
          <Span12>{dayjs(createdAt).format('YYYY / MM / DD')}</Span12>
        </Row>
      )}

      {type === 'SYSTEM' && <SystemChat chat={chat} />}
      {type === 'TEXT' && <TextChat chat={chat} />}
    </Col>
  );
};
