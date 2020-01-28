import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { TeamUserJoinFullFragment } from 'graphqls/fragments';
import { MyTeams } from './__generated__/MyTeams';

export const MY_TEAMS = gql`
  ${TeamUserJoinFullFragment}
  query MyTeams {
    myTeams {
      ...TeamUserJoinFull
    }
  }
`;

export function useMyTeams(option?: QueryHookOptions<MyTeams, Record<string, any>>) {
  return useQuery<MyTeams>(MY_TEAMS, { fetchPolicy: 'cache-first', ...option });
}

export function useCurrentTeamUserJoin(currentTeamUserJoinId: string | null) {
  const { data: teamUserJoins } = useMyTeams();
  const currentTeamUserJoin = teamUserJoins?.myTeams.find(teamUserJoin => teamUserJoin._id === currentTeamUserJoinId);
  return currentTeamUserJoin;
}
