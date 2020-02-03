import gql from 'graphql-tag';
import { ChatFullFragment } from 'graphqls/fragments';

export const SEND_TEXT_CHAT = gql`
  ${ChatFullFragment}
  mutation SendTextChat($channelId: String!, $text: String!) {
    sendTextChat(channelId: $channelId, text: $text) {
      ...ChatFull
    }
  }
`;
