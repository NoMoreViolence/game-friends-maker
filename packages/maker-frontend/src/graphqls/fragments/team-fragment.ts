import gql from 'graphql-tag';
import { GameFullFragment } from './game-fragment';

export const TeamFullFragment = gql`
  ${GameFullFragment}
  fragment TeamFull on Team {
    _id
    name
    gameId {
      ...GameFull
    }
    introduction
    createdAt
    updatedAt
    deleted
  }
`;
