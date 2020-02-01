import React, { FC } from 'react';

interface Props {
  currentTeamUserJoinId: string;
}
export const ChannelSelect: FC<Props> = ({ currentTeamUserJoinId }) => {
  console.log(currentTeamUserJoinId);
  return <div></div>;
};
