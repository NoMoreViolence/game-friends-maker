import { Loading } from 'components/loading';
import { useUpdateTeamUserJoinId } from 'graphqls/mutations/UPDATE_TEAM_USER_JOIN_ID';
import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { useMyTeamUserJoins } from 'graphqls/queries/MY_TEAM_USER_JOINS';
import React, { FC } from 'react';
import { ScrollContainer } from 'ui';
import { ChannelSelect } from './channel-select';
import { TeamSelect } from './team-select';

interface Props {
  closeDrawer(): void;
}
export const LeftDrawer: FC<Props> = ({ closeDrawer }) => {
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const updateTeamUserJoinId = useUpdateTeamUserJoinId();
  const { loading, data } = useMyTeamUserJoins();

  return (
    <>
      <Loading isLoading={loading} />
      <ScrollContainer width={100} height="100%">
        {data && (
          <TeamSelect
            currentTeamUserJoinId={currentTeamUserJoinId}
            teamUserJoins={data.myTeamUserJoins}
            updateTeamUserJoinId={updateTeamUserJoinId}
            closeDrawer={closeDrawer}
          />
        )}
      </ScrollContainer>
      <ScrollContainer width={250} height="100%">
        {currentTeamUserJoinId && <ChannelSelect currentTeamUserJoinId={currentTeamUserJoinId} />}
      </ScrollContainer>
    </>
  );
};
