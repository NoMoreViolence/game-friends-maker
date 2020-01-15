import { useQuery, useMutation } from '@apollo/react-hooks';
import { MutationFunctionOptions } from '@apollo/react-common';
import { UPDATE_CURRENT_LOCATION } from 'graphqls/mutations/UPDATE_CURRENT_LOCATION';
import { CURRENT_LOCATION } from 'graphqls/queries/CURRENT_LOCATION';
import { CurrentLocation } from 'graphqls/queries/__generated__/CurrentLocation';
import {
  UpdateCurrentLocation,
  UpdateCurrentLocationVariables,
} from 'graphqls/mutations/__generated__/UpdateCurrentLocation';
import { useCallback } from 'react';

export function useCurrentLocation() {
  const { data } = useQuery<CurrentLocation>(CURRENT_LOCATION);
  return data ? data.currentLocation : { currentTeamUserJoinId: null };
}

export function useUpdateCurrentLocation() {
  const [updateCurrentLocation] = useMutation<UpdateCurrentLocation, UpdateCurrentLocationVariables>(
    UPDATE_CURRENT_LOCATION,
  );

  const update = useCallback(
    (e: MutationFunctionOptions<UpdateCurrentLocation, UpdateCurrentLocationVariables> | undefined) => {
      localStorage.setItem('lastTeamUserJoinId', e?.variables?.nextCurrentLocation.currentTeamUserJoinId ?? '');
      updateCurrentLocation(e);
    },
    [updateCurrentLocation],
  );

  return update;
}
