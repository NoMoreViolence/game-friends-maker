import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { UserChannelJoinFullFragment } from 'graphqls/fragments';
import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import { MyUserChannelJoins, MyUserChannelJoinsVariables } from './__generated__/MyUserChannelJoins';

export const MY_USER_CHANNEL_JOINS = gql`
  ${UserChannelJoinFullFragment}
  query MyUserChannelJoins($teamId: String!) {
    myUserChannelJoins(teamId: $teamId) {
      ...UserChannelJoinFull
    }
  }
`;

export function useMyUserChannelJoins(
  teamUserJoin: TeamUserJoinFull,
  option?: QueryHookOptions<MyUserChannelJoins, MyUserChannelJoinsVariables>,
) {
  return useQuery<MyUserChannelJoins, MyUserChannelJoinsVariables>(MY_USER_CHANNEL_JOINS, {
    variables: { teamId: teamUserJoin.teamId },
    fetchPolicy: 'cache-first',
    ...option,
  });
}

export function useCurrentUserChannelJoin(teamUserJoin: TeamUserJoinFull, currentUserChannelJoinId: string | null) {
  const { data } = useMyUserChannelJoins(teamUserJoin);
  const currentUserChannelJoin = data?.myUserChannelJoins.find(
    userChannelJoin => userChannelJoin._id === currentUserChannelJoinId,
  );
  return currentUserChannelJoin;
}
