import gql from 'graphql-tag';
import { UserFullFragment } from './user';
import { TeamFullFragment } from './team';

export const TeamUserJoinFullFragment = gql`
  ${UserFullFragment}
  ${TeamFullFragment}
  fragment TeamUserJoinFull on TeamUserJoin {
    _id
    displayName
    userId
    user {
      ...UserFull
    }
    teamId
    team {
      ...TeamFull
    }
    muted
    userState
    createdAt
    updatedAt
    deleted
  }
`;

export const TeamUserJoinWithUserFragment = gql`
  ${UserFullFragment}
  fragment TeamUserJoinWithUser on TeamUserJoin {
    _id
    displayName
    userId
    user {
      ...UserFull
    }
    teamId
    muted
    userState
    createdAt
    updatedAt
    deleted
  }
`;

export const TeamUserJoinSubFragment = gql`
  fragment TeamUserJoinSub on TeamUserJoin {
    _id
    displayName
    userId
    teamId
    muted
    userState
    createdAt
    updatedAt
    deleted
  }
`;
