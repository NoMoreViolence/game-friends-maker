import { LoadingComponent } from 'components/loading';
import { useMyChannels } from 'graphqls/queries/MY_CHANNELS';
import { MyTeams_myTeams } from 'graphqls/queries/__generated__/MyTeams';
import { useDetectUserChannelJoinId } from 'helpers';
import React, { FC } from 'react';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { ChannelBox } from './channel-box';
import { useUpdateUserChannelJoinId } from 'graphqls/mutations/UPDATE_USER_CHANNEL_JOIN_ID';

interface Props {
  currentTeamUserJoin: MyTeams_myTeams;
  toggleIsSidebarOpen(): void;
}
export const SelectChannel: FC<Props> = ({ currentTeamUserJoin }) => {
  useDetectUserChannelJoinId(currentTeamUserJoin);
  const { data, loading } = useMyChannels(currentTeamUserJoin, { fetchPolicy: 'cache-first' });
  const userChannelJoins = data?.myChannels;
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const updateUserChannelJoinId = useUpdateUserChannelJoinId();

  return (
    <>
      <LoadingComponent isLoading={loading} />
      {userChannelJoins?.map(userChannelJoin => (
        <ChannelBox
          key={userChannelJoin._id}
          selectChannel={() => updateUserChannelJoinId(userChannelJoin._id)}
          userChannelJoin={userChannelJoin}
          selected={currentUserChannelJoinId === userChannelJoin._id}
        />
      ))}
    </>
  );
};
