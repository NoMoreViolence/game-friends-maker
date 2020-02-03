import gql from 'graphql-tag';
import { TeamFullFragment } from './team';
import { UserFullFragment } from './user';
import { ChannelFullFragment, ChannelSubFragment } from './channel';

export const UserChannelJoinFullFragment = gql`
  ${TeamFullFragment}
  ${UserFullFragment}
  ${ChannelFullFragment}
  fragment UserChannelJoinFull on UserChannelJoin {
    _id
    teamId
    team {
      ...TeamFull
    }
    userId
    user {
      ...UserFull
    }
    channelId
    channel {
      ...ChannelFull
    }
    createdAt
    updatedAt
  }
`;

export const UserChannelJoinSubFragment = gql`
  ${TeamFullFragment}
  ${UserFullFragment}
  ${ChannelSubFragment}
  fragment UserChannelJoinSub on UserChannelJoin {
    _id
    teamId
    team {
      ...TeamFull
    }
    userId
    user {
      ...UserFull
    }
    channelId
    channel {
      ...ChannelSub
    }
    createdAt
    updatedAt
  }
`;
