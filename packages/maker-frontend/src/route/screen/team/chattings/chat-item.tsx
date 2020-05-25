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
          pt="4px"
          pb="4px"
          borderBottomWidth="1px"
          borderWidth={0}
          borderStyle="solid"
          borderColor={Colors.gray}
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
