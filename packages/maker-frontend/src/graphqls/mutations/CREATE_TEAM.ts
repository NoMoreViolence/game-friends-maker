import gql from 'graphql-tag';
import { TeamSubFragment, UserFullFragment, TeamUserJoinSubFragment } from 'graphqls/fragments';

export const CREATE_TEAM = gql`
  ${TeamSubFragment}
  ${UserFullFragment}
  ${TeamUserJoinSubFragment}
  mutation CreateTeam($createTeamPayload: CreateTeamPayload!) {
    createTeam(createTeamPayload: $createTeamPayload) {
      team {
        ...TeamSub
      }
      user {
        ...UserFull
      }
      teamUserJoin {
        ...TeamUserJoinSub
      }
    }
  }
`;
