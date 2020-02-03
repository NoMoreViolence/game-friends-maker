import React, { FC } from 'react';
import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { useCurrentTeamUserJoin } from 'graphqls/queries/MY_TEAM_USER_JOINS';
import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { useCurrentUserChannelJoin } from 'graphqls/queries/MY_USER_CHANNEL_JOINS';
import { Loading } from 'components/loading';
import { Messages } from './messages';
import { MessageInput } from './message-input';

export const TeamContainer: FC = () => {
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const currentTeamUserJoin = useCurrentTeamUserJoin(currentTeamUserJoinId);
  if (!currentTeamUserJoin) {
    return <Loading isLoading />;
  }
  return <Team currentTeamUserJoin={currentTeamUserJoin} />;
};

interface Props {
  currentTeamUserJoin: TeamUserJoinFull;
}
export const Team: FC<Props> = ({ currentTeamUserJoin }) => {
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const currentUserChannelJoin = useCurrentUserChannelJoin(currentTeamUserJoin, currentUserChannelJoinId);
  if (!currentUserChannelJoin) {
    return <Loading isLoading />;
  }

  console.log(currentUserChannelJoin);

  return (
    <>
      <Messages userChannelJoin={currentUserChannelJoin} />
      <MessageInput userChannelJoin={currentUserChannelJoin} />
    </>
  );
};
