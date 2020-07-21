import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { UserChannelJoinSubFragment } from 'graphqls/fragments';
import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { UserChannelJoins, UserChannelJoinsVariables } from './__generated__/UserChannelJoins';

export const USER_CHANNEL_JOINS = gql`
  ${UserChannelJoinSubFragment}
  query UserChannelJoins($channelId: String!) {
    userChannelJoins(channelId: $channelId) {
      ...UserChannelJoinSub
    }
  }
`;

export function useUserChannelJoins(
  userChannelJoin: UserChannelJoinFull,
  option?: QueryHookOptions<UserChannelJoins, UserChannelJoinsVariables>
) {
  return useQuery<UserChannelJoins, UserChannelJoinsVariables>(USER_CHANNEL_JOINS, {
    variables: { channelId: userChannelJoin.channelId },
    fetchPolicy: 'cache-first',
    ...option,
  });
}

export function useChannelMembers(userChannelJoin: UserChannelJoinFull) {
  const { data } = useUserChannelJoins(userChannelJoin);
  return data?.userChannelJoins;
}
