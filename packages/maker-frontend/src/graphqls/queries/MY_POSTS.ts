import gql from 'graphql-tag';
import { UserSubFragment, GameFullFragment } from 'graphqls/fragments';

export const MY_POSTS = gql`
  ${UserSubFragment}
  ${GameFullFragment}
  query MyPosts($getPost: GetPostsPayload!, $option: GetPostsOptionPayload!) {
    posts(getPost: $getPost, option: $option) {
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
