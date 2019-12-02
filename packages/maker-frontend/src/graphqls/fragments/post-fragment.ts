import gql from 'graphql-tag';
import { UserSubFragment } from './user-sub-fragment';
import { GameFullFragment } from './game-fragment';

export const PostFullFragment = gql`
  ${UserSubFragment}
  ${GameFullFragment}
  fragment PostFull on Post {
    _id
    name
    gameId {
      ...GameFull
    }
    authorId {
      ...UserSub
    }
    pendingPeopleIds {
      ...UserSub
    }
    relatedPeopleIds {
      ...UserSub
    }
    introduction
    createdAt
    updatedAt
  }
`;
