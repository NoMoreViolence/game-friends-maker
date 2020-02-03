import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CurrentUserChannelJoinIdFragment } from 'graphqls/fragments/current-user-channel-join-id';
import { CurrentUserChannelJoinId } from './__generated__/CurrentUserChannelJoinId';

export const CURRENT_USER_CHANNEL_JOIN_ID = gql`
  ${CurrentUserChannelJoinIdFragment}
  query CurrentUserChannelJoinId {
    currentUserChannelJoinId @client {
      ...CurrentUserChannelJoinIdFull
    }
  }
`;

export function useCurrentUserChannelJoinId() {
  const { data } = useQuery<CurrentUserChannelJoinId>(CURRENT_USER_CHANNEL_JOIN_ID, { fetchPolicy: 'cache-first' });
  return data?.currentUserChannelJoinId.currentUserChannelJoinId ?? null;
}
