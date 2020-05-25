import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useSendTextChatOptimistic } from 'graphqls/mutations/SEND_TEXT_CHAT';
import React, { FC, useCallback, useState } from 'react';
import { TextInput } from 'ui';

interface Props {
  userChannelJoin: UserChannelJoinFull;
}
export const ChatInput: FC<Props> = ({ userChannelJoin }) => {
  const [text, setText] = useState('');
  const sendTextChat = useSendTextChatOptimistic(userChannelJoin);
  const onSubmit = useCallback(() => sendTextChat(text), [sendTextChat, text]);

  return (
    <TextInput
      mt="12px !important"
      mb="12px !important"
      mr="12px !important"
      ml="12px !important"
      text={text}
      name="chat"
      type="text"
      onChangeText={setText}
      onEnterSubmit={onSubmit}
      placeholder="Talk"
    />
  );
};
