import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import { useUpdateUserChannelJoinId } from 'graphqls/mutations/UPDATE_USER_CHANNEL_JOIN_ID';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { useMyUserChannelJoins } from 'graphqls/queries/MY_USER_CHANNEL_JOINS';
import { useEffect } from 'react';
import { usePrevious } from './use-previous';

export function useDetectUserChannelJoinId(teamUserJoin: TeamUserJoinFull) {
  const updateCurrentUserChannelJoinId = useUpdateUserChannelJoinId();
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const prevCurrentLocation = usePrevious(currentUserChannelJoinId);
  const { data, loading, refetch } = useMyUserChannelJoins(teamUserJoin, { fetchPolicy: 'cache-first' });
  const myUserChannelJoins = data?.myUserChannelJoins;

  // 팀 선택이 변하면 refetch해서 채널 목록을 다시 가져온다
  useEffect(() => {
    refetch();
  }, [teamUserJoin, refetch]);

  // 채널 목록을 불러온 후 마지막으로 접속한 채널로 리다이렉트 한다. 없으면 받은 데이터의 첫번째 채널로
  useEffect(() => {
    if (!loading) {
      const lastChannel = myUserChannelJoins?.find(userChannelJoin => {
        const lastUserChannelJoinId = localStorage.getItem(`lastUserChannelJoinId:${userChannelJoin._id}`);
        if (lastUserChannelJoinId && userChannelJoin._id === lastUserChannelJoinId) {
          return true;
        }
        return false;
      });

      if (lastChannel) {
        updateCurrentUserChannelJoinId(lastChannel._id);
      }

      if (!lastChannel && myUserChannelJoins !== undefined && myUserChannelJoins[0] !== undefined) {
        updateCurrentUserChannelJoinId(myUserChannelJoins[0]._id);
      }
    }
  }, [currentUserChannelJoinId, prevCurrentLocation, updateCurrentUserChannelJoinId, loading, myUserChannelJoins]);
}
