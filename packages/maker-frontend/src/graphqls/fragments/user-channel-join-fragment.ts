import gql from 'graphql-tag';
import { TeamFullFragment } from './team-fragment';
import { UserFullFragment } from './user-fragment';
import { ChannelFullFragment, ChannelSubFragment } from './channel-frgament';

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
