import gql from 'graphql-tag';

export const UPDATE_POST = gql`
  mutation UpdateTeam($teamId: String!, $nextTeam: UpdateTeamPayload!) {
    updateTeam(teamId: $teamId, nextTeam: $nextTeam) {
      name
      authorId {
        name
        _id
      }
    }
  }
`;
