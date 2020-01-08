import gql from 'graphql-tag';
import { TeamFullFragment } from 'graphqls/fragments';

export const UPDATE_POST = gql`
  ${TeamFullFragment}
  mutation UpdateTeam($teamId: String!, $nextTeam: UpdateTeamPayload!) {
    updateTeam(teamId: $teamId, nextTeam: $nextTeam) {
      ...TeamFull
    }
  }
`;
