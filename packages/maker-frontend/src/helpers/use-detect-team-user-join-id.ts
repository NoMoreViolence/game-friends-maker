import { useEffect } from 'react';
import { useCurrentLocation } from 'data-fetch/use-current-location';
import { useRouter } from './use-router';
import { useGetPreviousValue } from './use-get-prev-value';

export function useDetectTeamUserJoinId() {
  const { push } = useRouter();
  const currentLocation = useCurrentLocation();
  const prevCurrentLocation = useGetPreviousValue(currentLocation);
  useEffect(() => {
    if (
      currentLocation?.currentTeamUserJoinId !== null &&
      currentLocation?.currentTeamUserJoinId !== prevCurrentLocation?.currentTeamUserJoinId
    ) {
      push('/app/team');
    }
    if (
      currentLocation?.currentTeamUserJoinId === null &&
      currentLocation?.currentTeamUserJoinId !== prevCurrentLocation?.currentTeamUserJoinId
    ) {
      push('/app/home');
    }
  }, [currentLocation, prevCurrentLocation, push]);
}
