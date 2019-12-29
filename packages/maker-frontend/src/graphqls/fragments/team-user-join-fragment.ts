import gql from 'graphql-tag';
import { UserFullFragment } from './user-fragment';
import { TeamFullFragment } from './team-fragment';

export const TeamUserJoinFullFragment = gql`
  ${UserFullFragment}
  ${TeamFullFragment}
  fragment TeamUserJoinFull on TeamUserJoin {
    _id
    userId {
      ...UserFull
    }
    teamId {
      ...TeamFull
    }
    userState
    createdAt
    updatedAt
    deleted
  }
`;

export const TeamUserJoinSubFragment = gql`
  fragment TeamUserJoinSub on TeamUserJoin {
    _id
    userState
    createdAt
    updatedAt
    deleted
  }
`;
