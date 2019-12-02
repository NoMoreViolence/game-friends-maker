import gql from 'graphql-tag';
import { UserSubFragment } from './user-sub-fragment';
import { GameFullFragment } from './game-fragment';

export const TeamFullFragment = gql`
  ${UserSubFragment}
  ${GameFullFragment}
  fragment TeamFull on Team {
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
