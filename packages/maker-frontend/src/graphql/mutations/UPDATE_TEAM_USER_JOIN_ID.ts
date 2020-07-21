import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CurrentTeamUserJoinIdFragment } from 'graphqls/fragments/current-team-user-join-id';
import { useCallback } from 'react';
import {
  UpdateCurrentTeamUserJoinId,
  UpdateCurrentTeamUserJoinIdVariables,
} from './__generated__/UpdateCurrentTeamUserJoinId';

export const UPDATE_TEAM_USER_JOIN_ID = gql`
  ${CurrentTeamUserJoinIdFragment}
  mutation UpdateCurrentTeamUserJoinId($nextCurrentTeamUserJoinId: NextCurrentTeamUserJoinId!) {
    updateCurrentTeamUserJoinId(nextCurrentTeamUserJoinId: $nextCurrentTeamUserJoinId) @client {
      ...CurrentTeamUserJoinIdFull
    }
  }
`;

export function useUpdateTeamUserJoinId() {
  const [updateCurrentTeamUserJoinId] = useMutation<UpdateCurrentTeamUserJoinId, UpdateCurrentTeamUserJoinIdVariables>(
    UPDATE_TEAM_USER_JOIN_ID
  );

  const update = useCallback(
    (nextCurrentTeamUserJoinId: string | null) => {
      localStorage.setItem('lastTeamUserJoinId', nextCurrentTeamUserJoinId ?? '');
      updateCurrentTeamUserJoinId({
        variables: {
          nextCurrentTeamUserJoinId: {
            currentTeamUserJoinId: nextCurrentTeamUserJoinId,
          },
        },
      });
    },
    [updateCurrentTeamUserJoinId]
  );

  return update;
}
