import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { CurrentUserTeamId } from './__generated__/CurrentUserTeamId';

const CURRENT_USER_TEAM_ID = gql`
  query CurrentUserTeamId {
    currentUserTeamId @client
  }
`;

export function useCurrentUserTeamId() {
  const { data } = useQuery<CurrentUserTeamId>(CURRENT_USER_TEAM_ID);
  return data?.currentUserTeamId;
}
