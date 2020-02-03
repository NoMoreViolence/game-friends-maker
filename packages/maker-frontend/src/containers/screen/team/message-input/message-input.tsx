import React, { FC } from 'react';
import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';

interface Props {
  userChannelJoin: UserChannelJoinFull;
}
export const MessageInput: FC<Props> = ({ userChannelJoin }) => {
  console.log(userChannelJoin);
  return <div>message input</div>;
};
