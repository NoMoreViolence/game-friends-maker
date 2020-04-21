import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CurrentUserChannelJoinIdFragment } from 'graphqls/fragments/current-user-channel-join-id';
import { useCallback } from 'react';
import {
  UpdateCurrentUserChannelJoinId,
  UpdateCurrentUserChannelJoinIdVariables,
} from './__generated__/UpdateCurrentUserChannelJoinId';
import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';

export const UPDATE_USER_CHANNEL_JOIN_ID = gql`
  ${CurrentUserChannelJoinIdFragment}
  mutation UpdateCurrentUserChannelJoinId($nextCurrentUserChannelJoinId: NextCurrentUserChannelJoinId!) {
    updateCurrentUserChannelJoinId(nextCurrentUserChannelJoinId: $nextCurrentUserChannelJoinId) @client {
      ...CurrentUserChannelJoinIdFull
    }
  }
`;

export function useUpdateUserChannelJoinId() {
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const [updateCurrentUserChannelJoinId] = useMutation<
    UpdateCurrentUserChannelJoinId,
    UpdateCurrentUserChannelJoinIdVariables
  >(UPDATE_USER_CHANNEL_JOIN_ID);

  const update = useCallback(
    (nextCurrentUserChannelJoinId: string) => {
      localStorage.setItem(`lastUserChannelJoinId:${currentTeamUserJoinId}`, nextCurrentUserChannelJoinId);
      updateCurrentUserChannelJoinId({
        variables: {
          nextCurrentUserChannelJoinId: {
            currentUserChannelJoinId: nextCurrentUserChannelJoinId,
          },
        },
      });
    },
    [currentTeamUserJoinId, updateCurrentUserChannelJoinId]
  );

  return update;
}
