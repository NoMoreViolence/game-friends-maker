import { Loading } from 'components/loading';
import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { useCurrentTeamUserJoin } from 'graphqls/queries/MY_TEAM_USER_JOINS';
import { useCurrentUserChannelJoin } from 'graphqls/queries/MY_USER_CHANNEL_JOINS';
import React, { FC } from 'react';
import { ChatInput } from './chat-input';
import { Chattings } from './chattings';

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

  return (
    <>
      <Chattings userChannelJoin={currentUserChannelJoin} />
      <ChatInput userChannelJoin={currentUserChannelJoin} />
    </>
  );
};
