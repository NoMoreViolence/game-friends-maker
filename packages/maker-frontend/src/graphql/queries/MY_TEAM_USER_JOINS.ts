import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { TeamUserJoinFullFragment } from 'graphqls/fragments';
import { useUpdateTeamUserJoinId } from '../mutations/UPDATE_TEAM_USER_JOIN_ID';
import { useCurrentTeamUserJoinId } from './CURRENT_TEAM_USER_JOIN_ID';
import { MyTeamUserJoins } from './__generated__/MyTeamUserJoins';

export const MY_TEAM_USER_JOINS = gql`
  ${TeamUserJoinFullFragment}
  query MyTeamUserJoins {
    myTeamUserJoins {
      ...TeamUserJoinFull
    }
  }
`;

export function useMyTeamUserJoins(option?: QueryHookOptions<MyTeamUserJoins, Record<string, any>>) {
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const updateTeamUserJoinId = useUpdateTeamUserJoinId();
  return useQuery<MyTeamUserJoins>(MY_TEAM_USER_JOINS, {
    fetchPolicy: 'cache-first',
    onCompleted: (data) => {
      const lastTeamUserJoinId = localStorage.getItem('lastTeamUserJoinId');
      const selectedTeamUserJoin = data?.myTeamUserJoins.find((s) => s._id === lastTeamUserJoinId);
      if (selectedTeamUserJoin !== undefined && currentTeamUserJoinId !== selectedTeamUserJoin._id) {
        updateTeamUserJoinId(selectedTeamUserJoin._id);
      }
    },
    ...option,
  });
}

export function useCurrentTeamUserJoin(currentTeamUserJoinId: string | null) {
  const { data } = useMyTeamUserJoins();
  const currentTeamUserJoin = data?.myTeamUserJoins.find((teamUserJoin) => teamUserJoin._id === currentTeamUserJoinId);
  return currentTeamUserJoin;
}
