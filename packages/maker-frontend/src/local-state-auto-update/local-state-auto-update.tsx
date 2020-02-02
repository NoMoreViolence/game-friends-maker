import React, { FC } from 'react';
import { useDetectTeamUserJoinId } from 'helpers';
import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { useCurrentTeamUserJoin } from 'graphqls/queries/MY_TEAM_USER_JOINS';
import { DetectUserChannelJoin } from './detect-user-channel-join';

export const LocalStateAutoUpdate: FC = () => {
  // 팀 아이디에 따라서 자동으로 라우트 라다이렉트
  useDetectTeamUserJoinId();
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const currentTeamUserJoin = useCurrentTeamUserJoin(currentTeamUserJoinId);

  if (!currentTeamUserJoin) {
    return null;
  }

  return <DetectUserChannelJoin teamUserJoin={currentTeamUserJoin} />;
};
