import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { useEffect } from 'react';
import { useGetPreviousValue } from './use-get-prev-value';
import { useRouter } from './use-router';

export function useDetectTeamUserJoinId() {
  const { push } = useRouter();
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const prevCurrentLocation = useGetPreviousValue(currentTeamUserJoinId);
  useEffect(() => {
    if (currentTeamUserJoinId !== null && currentTeamUserJoinId !== prevCurrentLocation) {
      push('/app/team');
    }
    if (currentTeamUserJoinId === null && currentTeamUserJoinId !== prevCurrentLocation) {
      push('/app/home');
    }
  }, [currentTeamUserJoinId, prevCurrentLocation, push]);
}
