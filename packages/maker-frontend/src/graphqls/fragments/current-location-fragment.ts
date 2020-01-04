import gql from 'graphql-tag';

export const CurrentLocationFragment = gql`
  fragment CurrentLocationFull on CurrentLocation {
    currentTeamUserJoinId
  }
`;
