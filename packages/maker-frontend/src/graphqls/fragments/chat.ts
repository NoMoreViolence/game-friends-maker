import gql from 'graphql-tag';
import { UserFullFragment } from './user';

export const ChatFullFragment = gql`
  ${UserFullFragment}
  fragment ChatFull on Chat {
    _id
    text
    userId
    user {
      ...UserFull
    }
    channelId
    createdAt
    updatedAt
    deleted
  }
`;