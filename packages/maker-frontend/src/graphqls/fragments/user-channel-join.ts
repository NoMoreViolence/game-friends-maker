import gql from 'graphql-tag';
import { ChannelFullFragment } from './channel';
import { TeamFullFragment } from './team';
import { UserFullFragment } from './user';

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
    firstChatReadAt
    lastChatReadAt
    createdAt
    updatedAt
  }
`;

export const UserChannelJoinSubFragment = gql`
  ${UserFullFragment}
  fragment UserChannelJoinSub on UserChannelJoin {
    _id
    teamId
    userId
    user {
      ...UserFull
    }
    channelId
    firstChatReadAt
    lastChatReadAt
    createdAt
    updatedAt
  }
`;
