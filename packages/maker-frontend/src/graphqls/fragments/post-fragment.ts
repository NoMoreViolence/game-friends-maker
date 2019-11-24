import gql from 'graphql-tag';
import { UserSubFragment } from './user-fragment';

export const PostFullFragment = gql`
  ${UserSubFragment}
  fragment PostFull on Post {
    _id
    name
    authorId {
      ...UserSub
    }
  }
`;
