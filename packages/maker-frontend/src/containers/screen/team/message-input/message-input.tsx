import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useSendTextChatOptimistic } from 'graphqls/mutations/SEND_TEXT_CHAT';
import React, { FC, useCallback, useState } from 'react';
import { TextInput } from 'ui';

interface Props {
  userChannelJoin: UserChannelJoinFull;
}
export const MessageInput: FC<Props> = ({ userChannelJoin }) => {
  const [text, setText] = useState('');
  const sendTextChat = useSendTextChatOptimistic(userChannelJoin);
  const onSubmit = useCallback(() => sendTextChat(text), [sendTextChat, text]);

  return (
    <TextInput
      text={text}
      onChangeText={setText}
      onEnterSubmit={onSubmit}
      transition={0.25}
      pt={8}
      pb={8}
      pr={8}
      pl={8}
      borderRadius={4}
      mt={8}
      mb={8}
      mr={8}
      ml={8}
      placeholder="DJ, spin that shit !"
    />
  );
};
