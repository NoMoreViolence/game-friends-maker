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
      mt="12px"
      mb="12px"
      mr="12px"
      ml="12px"
      text={text}
      onChangeText={setText}
      onEnterSubmit={onSubmit}
      placeholder="Talk"
    />
  );
};
