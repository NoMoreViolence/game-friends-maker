import React, { FC } from 'react';
import { MyTeams_myTeams } from 'graphqls/queries/__generated__/MyTeams';
import { useMyChannels } from 'graphqls/queries/MY_CHANNELS';
import { useDetectUserChannelJoinId } from 'helpers';
import { LoadingComponent } from 'components/loading';

interface Props {
  currentTeamUserJoin: MyTeams_myTeams;
  toggleIsSidebarOpen(): void;
}
export const SelectChannel: FC<Props> = ({ currentTeamUserJoin }) => {
  useDetectUserChannelJoinId(currentTeamUserJoin);
  const { loading } = useMyChannels(currentTeamUserJoin, { fetchPolicy: 'cache-first' });
  return (
    <>
      <LoadingComponent isLoading={loading} />{' '}
    </>
  );
};
