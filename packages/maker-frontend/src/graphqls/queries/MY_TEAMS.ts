import gql from 'graphql-tag';
import { TeamUserJoinFullFragment, CurrentLocationFragment } from 'graphqls/fragments';

export const MY_TEAMS = gql`
  ${TeamUserJoinFullFragment}
  ${CurrentLocationFragment}
  query MyTeams {
    myTeams {
      ...TeamUserJoinFull
    }
    currentLocation @client {
      ...CurrentLocationFull
    }
  }
`;
