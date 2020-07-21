import gql from 'graphql-tag';

export const CurrentUserChannelJoinIdFragment = gql`
  fragment CurrentUserChannelJoinIdFull on CurrentUserChannelJoinId {
    currentUserChannelJoinId
  }
`;
