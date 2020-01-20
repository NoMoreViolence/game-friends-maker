import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { UserChannelJoinFullFragment } from 'graphqls/fragments';
import { MyChannels, MyChannelsVariables } from './__generated__/MyChannels';
import { MyTeams_myTeams } from './__generated__/MyTeams';

export const MY_CHANNELS = gql`
  ${UserChannelJoinFullFragment}
  query MyChannels($teamId: String!) {
    myChannels(teamId: $teamId) {
      ...UserChannelJoinFull
    }
  }
`;

export function useMyChannels(team: MyTeams_myTeams, option?: QueryHookOptions<MyChannels, MyChannelsVariables>) {
  return useQuery<MyChannels, MyChannelsVariables>(MY_CHANNELS, {
    variables: { teamId: team.teamId },
    fetchPolicy: 'cache-and-network',
    ...option,
  });
}
