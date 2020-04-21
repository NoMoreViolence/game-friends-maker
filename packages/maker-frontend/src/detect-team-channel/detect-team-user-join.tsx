import React, { FC } from 'react';
import { useDetectTeamUserJoinId } from 'helpers';
import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { useCurrentTeamUserJoin } from 'graphqls/queries/MY_TEAM_USER_JOINS';
import { DetectUserChannelJoin } from './detect-user-channel-join';

export const DetectTeamUserJoin: FC = () => {
  useDetectTeamUserJoinId();
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const currentTeamUserJoin = useCurrentTeamUserJoin(currentTeamUserJoinId);

  if (!currentTeamUserJoin) {
    return null;
  }

  return <DetectUserChannelJoin teamUserJoin={currentTeamUserJoin} />;
};
