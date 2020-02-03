import gql from 'graphql-tag';
import { UserFullFragment } from './user';
import { TeamFullFragment } from './team';

export const TeamUserJoinFullFragment = gql`
  ${UserFullFragment}
  ${TeamFullFragment}
  fragment TeamUserJoinFull on TeamUserJoin {
    _id
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

export const TeamUserJoinSubFragment = gql`
  fragment TeamUserJoinSub on TeamUserJoin {
    _id
    userState
    createdAt
    updatedAt
    deleted
  }
`;
