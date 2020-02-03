import gql from 'graphql-tag';

export const ChatFullFragment = gql`
  fragment ChatFull on Chat {
    _id
    text
    userId
    channelId
    createdAt
    updatedAt
    deleted
  }
`;
