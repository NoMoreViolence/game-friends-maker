import { useUpdateUserChannelJoinId } from 'graphqls/mutations/UPDATE_USER_CHANNEL_JOIN_ID';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { useMyChannels } from 'graphqls/queries/MY_CHANNELS';
import { MyTeams_myTeams } from 'graphqls/queries/__generated__/MyTeams';
import { useEffect } from 'react';
import { useGetPreviousValue } from './use-get-prev-value';

export function useDetectUserChannelJoinId(teamUserJoin: MyTeams_myTeams) {
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const prevCurrentLocation = useGetPreviousValue(currentUserChannelJoinId);
  const updateCurrentUserChannelJoinId = useUpdateUserChannelJoinId();
  const { data: myChannelsData, loading, refetch } = useMyChannels(teamUserJoin, { fetchPolicy: 'cache-first' });

  useEffect(() => {
    refetch();
  }, [teamUserJoin, refetch]);

  useEffect(() => {
    if (!loading) {
      const isDetected =
        (
          myChannelsData?.myChannels.filter(userChannelJoin => {
            console.log('awefawef');
            const isExist = localStorage.getItem(`lastUserChannelJoinId:${userChannelJoin._id}`);
            if (isExist !== null && userChannelJoin._id === isExist) {
              console.log('여기있지롱');
              updateCurrentUserChannelJoinId(userChannelJoin._id);
              return true;
            }
            return false;
          }) ?? []
        ).length === 1;

      if (!isDetected && myChannelsData !== undefined && myChannelsData.myChannels[0] !== undefined) {
        console.log('어디서 널이 나오는거야 시벌탱');
        updateCurrentUserChannelJoinId(myChannelsData?.myChannels[0]._id);
      }
    }
  }, [currentUserChannelJoinId, prevCurrentLocation, myChannelsData, updateCurrentUserChannelJoinId, loading]);
}
