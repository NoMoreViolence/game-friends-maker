import gql from 'graphql-tag';
import { TeamFullFragment } from './team';

export const ChannelFullFragment = gql`
  ${TeamFullFragment}
  fragment ChannelFull on Channel {
    _id
    name
    teamId
    team {
      ...TeamFull
    }
    firstChatCreatedAt
    lastChatCreatedAt
    createdAt
    updatedAt
  }
`;

export const ChannelSubFragment = gql`
  fragment ChannelSub on Channel {
    _id
    name
    teamId
    createdAt
    updatedAt
  }
`;
