import gql from 'graphql-tag';
import { GameFullFragment } from './game';

export const TeamFullFragment = gql`
  ${GameFullFragment}
  fragment TeamFull on Team {
    _id
    name
    gameId
    game {
      ...GameFull
    }
    introduction
    createdAt
    updatedAt
    deleted
  }
`;

export const TeamSubFragment = gql`
  fragment TeamSub on Team {
    _id
    name
    introduction
    createdAt
    updatedAt
    deleted
  }
`;
