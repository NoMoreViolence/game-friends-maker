import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CurrentTeamUserJoinIdFragment } from 'graphqls/fragments/current-team-user-join-id-fragment';
import { CurrentTeamUserJoinId } from './__generated__/CurrentTeamUserJoinId';

export const CURRENT_TEAM_USER_JOIN_ID = gql`
  ${CurrentTeamUserJoinIdFragment}
  query CurrentTeamUserJoinId {
    currentTeamUserJoinId @client {
      ...CurrentTeamUserJoinIdFull
    }
  }
`;

export function useCurrentTeamUserJoinId() {
  const { data } = useQuery<CurrentTeamUserJoinId>(CURRENT_TEAM_USER_JOIN_ID, { fetchPolicy: 'cache-first' });
  return data?.currentTeamUserJoinId.currentTeamUserJoinId ?? null;
}
