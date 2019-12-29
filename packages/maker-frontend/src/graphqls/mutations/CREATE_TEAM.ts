import gql from 'graphql-tag';
import { TeamFullFragment, UserFullFragment, TeamUserJoinFullFragment } from 'graphqls/fragments';

export const UPDATE_POST = gql`
  ${TeamFullFragment}
  ${UserFullFragment}
  ${TeamUserJoinFullFragment}
  mutation CreateTeam($createTeamPayload: CreateTeamPayload!) {
    createTeam(createTeamPayload: $createTeamPayload) {
      team {
        ...TeamFull
      }
      user {
        ...UserFull
      }
      teamUserJoin {
        ...TeamUserJoinFull
      }
    }
  }
`;
