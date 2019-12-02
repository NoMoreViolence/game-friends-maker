import gql from 'graphql-tag';
import { UserSubFragment, GameFullFragment } from 'graphqls/fragments';

export const MY_POSTS = gql`
  ${UserSubFragment}
  ${GameFullFragment}
  query MyTeams($getTeam: GetTeamsPayload!, $option: GetTeamsOptionPayload!) {
    teams(getTeam: $getTeam, option: $option) {
      _id
      name
      introduction
      gameId {
        ...GameFull
      }
      relatedPeopleIds {
        ...UserSub
      }
      createdAt
    }
  }
`;
