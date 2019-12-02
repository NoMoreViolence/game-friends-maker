import gql from 'graphql-tag';
import { PostFullFragment } from './post-fragment';

export const UserFullFragment = gql`
  ${PostFullFragment}
  fragment UserFull on User {
    _id
    name
    email
    posts {
      ...PostFull
    }
    pendingTeams {
      ...PostFull
    }
    relatedTeams {
      ...PostFull
    }
    createdAt
    updatedAt
    deleted
  }
`;
