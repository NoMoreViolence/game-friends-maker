import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { TeamUserJoinWithUserFragment } from 'graphqls/fragments';
import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import { TeamUserJoins, TeamUserJoinsVariables } from './__generated__/TeamUserJoins';

export const TEAM_USER_JOINS = gql`
  ${TeamUserJoinWithUserFragment}
  query TeamUserJoins($teamId: String!) {
    teamUserJoins(teamId: $teamId) {
      ...TeamUserJoinWithUser
    }
  }
`;

export function useTeamUserJoins(
  teamUserJoin: TeamUserJoinFull,
  option?: QueryHookOptions<TeamUserJoins, TeamUserJoinsVariables>
) {
  return useQuery<TeamUserJoins, TeamUserJoinsVariables>(TEAM_USER_JOINS, {
    variables: { teamId: teamUserJoin.teamId },
    fetchPolicy: 'cache-first',
    ...option,
  });
}

export function useTeamMembers(currentTeamUserJoin: TeamUserJoinFull) {
  const { data } = useTeamUserJoins(currentTeamUserJoin);
  return data?.teamUserJoins;
}
