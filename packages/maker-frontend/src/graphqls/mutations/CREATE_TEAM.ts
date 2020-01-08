import gql from 'graphql-tag';
import { TeamUserJoinFullFragment } from 'graphqls/fragments';

export const CREATE_TEAM = gql`
  ${TeamUserJoinFullFragment}
  mutation CreateTeam($createTeamPayload: CreateTeamPayload!) {
    createTeam(createTeamPayload: $createTeamPayload) {
      ...TeamUserJoinFull
    }
  }
`;
