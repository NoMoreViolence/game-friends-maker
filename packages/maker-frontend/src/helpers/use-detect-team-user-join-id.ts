import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { useEffect } from 'react';
import { usePrevious } from './use-previous';
import { useRouter } from './use-router';

export function useDetectTeamUserJoinId() {
  const { push } = useRouter();
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const prevCurrentLocation = usePrevious(currentTeamUserJoinId);
  useEffect(() => {
    if (currentTeamUserJoinId !== null && currentTeamUserJoinId !== prevCurrentLocation) {
      push('/app/team');
    }
    if (currentTeamUserJoinId === null && currentTeamUserJoinId !== prevCurrentLocation) {
      push('/app/home');
    }
  }, [currentTeamUserJoinId, prevCurrentLocation, push]);
}
