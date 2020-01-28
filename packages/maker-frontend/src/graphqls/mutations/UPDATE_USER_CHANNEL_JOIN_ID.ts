import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CurrentUserChannelJoinIdFragment } from 'graphqls/fragments/current-user-channel-join-id-fragment';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { useCallback } from 'react';
import {
  UpdateCurrentUserChannelJoinId,
  UpdateCurrentUserChannelJoinIdVariables,
} from './__generated__/UpdateCurrentUserChannelJoinId';

export const UPDATE_USER_CHANNEL_JOIN_ID = gql`
  ${CurrentUserChannelJoinIdFragment}
  mutation UpdateCurrentUserChannelJoinId($nextCurrentUserChannelJoinId: NextCurrentUserChannelJoinId!) {
    updateCurrentUserChannelJoinId(nextCurrentUserChannelJoinId: $nextCurrentUserChannelJoinId) @client {
      ...CurrentUserChannelJoinIdFull
    }
  }
`;

export function useUpdateUserChannelJoinId() {
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const [updateCurrentUserChannelJoinId] = useMutation<
    UpdateCurrentUserChannelJoinId,
    UpdateCurrentUserChannelJoinIdVariables
  >(UPDATE_USER_CHANNEL_JOIN_ID);

  const update = useCallback(
    (nextCurrentUserChannelJoinId: string | null) => {
      localStorage.removeItem(`lastUserChannelJoinId:${currentUserChannelJoinId}`);
      localStorage.setItem(`lastUserChannelJoinId:${nextCurrentUserChannelJoinId}`, nextCurrentUserChannelJoinId ?? '');
      updateCurrentUserChannelJoinId({
        variables: {
          nextCurrentUserChannelJoinId: {
            currentUserChannelJoinId: nextCurrentUserChannelJoinId,
          },
        },
      });
    },
    [currentUserChannelJoinId, updateCurrentUserChannelJoinId],
  );

  return update;
}
