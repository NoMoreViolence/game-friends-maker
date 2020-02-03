import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ChatFullFragment } from 'graphqls/fragments';
import { ChattingsInChannel, ChattingsInChannelVariables } from './__generated__/ChattingsInChannel';

export const CHATTINGS_IN_CHANNEL = gql`
  ${ChatFullFragment}
  query ChattingsInChannel($channelId: String!, $getChattingsPayload: GetChattingsPayload) {
    chattingsInChannel(channelId: $channelId, getChattingsPayload: $getChattingsPayload) {
      ...ChatFull
    }
  }
`;

export function useChattingsInChannel(variables: ChattingsInChannelVariables) {
  return useQuery<ChattingsInChannel, ChattingsInChannelVariables>(CHATTINGS_IN_CHANNEL, {
    variables,
    fetchPolicy: 'cache-first',
  });
}
