import gql from 'graphql-tag';
import { TeamUserJoinFullFragment } from 'graphqls/fragments';

export const MY_TEAMS = gql`
  ${TeamUserJoinFullFragment}
  query MyTeams {
    myTeams {
      ...TeamUserJoinFull
    }
  }
`;
