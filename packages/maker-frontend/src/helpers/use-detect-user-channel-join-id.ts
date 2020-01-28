import { useUpdateUserChannelJoinId } from 'graphqls/mutations/UPDATE_USER_CHANNEL_JOIN_ID';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { useMyChannels } from 'graphqls/queries/MY_CHANNELS';
import { MyTeams_myTeams } from 'graphqls/queries/__generated__/MyTeams';
import { useEffect } from 'react';
import { useGetPreviousValue } from './use-get-prev-value';

export function useDetectUserChannelJoinId(teamUserJoin: MyTeams_myTeams) {
  const updateCurrentUserChannelJoinId = useUpdateUserChannelJoinId();
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const prevCurrentLocation = useGetPreviousValue(currentUserChannelJoinId);
  const { data, loading, refetch } = useMyChannels(teamUserJoin, { fetchPolicy: 'cache-first' });
  const myChannels = data?.myChannels;

  // 팀 선택이 변하면 refetch해서 채널 목록을 다시 가져온다
  useEffect(() => {
    refetch();
  }, [teamUserJoin, refetch]);

  // 채널 목록을 불러온 후 마지막으로 접속한 채널로 리다이렉트 한다. 없으면 받은 데이터의 첫번째 채널로
  useEffect(() => {
    if (!loading) {
      const lastChannel = myChannels?.find(userChannelJoin => {
        const lastUserChannelJoinId = localStorage.getItem(`lastUserChannelJoinId:${userChannelJoin._id}`);
        if (lastUserChannelJoinId && userChannelJoin._id === lastUserChannelJoinId) {
          return true;
        }
        return false;
      });

      if (lastChannel) {
        updateCurrentUserChannelJoinId(lastChannel._id);
      }

      if (!lastChannel && myChannels !== undefined && myChannels[0] !== undefined) {
        updateCurrentUserChannelJoinId(myChannels[0]._id);
      }
    }
  }, [currentUserChannelJoinId, prevCurrentLocation, updateCurrentUserChannelJoinId, loading, myChannels]);
}
