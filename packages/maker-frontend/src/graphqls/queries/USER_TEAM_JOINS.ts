import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { TeamUserJoinFullFragment } from 'graphqls/fragments';
import { TeamUserJoins, TeamUserJoinsVariables } from './__generated__/TeamUserJoins';

export const TEAM_USER_JOINS = gql`
  ${TeamUserJoinFullFragment}
  query TeamUserJoins($getTeamUserJoinPayload: GetTeamUserJoinPayload!) {
    teamUserJoins(getTeamUserJoinPayload: $getTeamUserJoinPayload) {
      ...TeamUserJoinFull
    }
  }
`;

export function useTeamUserJoins(option?: QueryHookOptions<TeamUserJoins, TeamUserJoinsVariables>) {
  return useQuery<TeamUserJoins>(TEAM_USER_JOINS, {
    fetchPolicy: 'cache-first',
    ...option,
  });
}
