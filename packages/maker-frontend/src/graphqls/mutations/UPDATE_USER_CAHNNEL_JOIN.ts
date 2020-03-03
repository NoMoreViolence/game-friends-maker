import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { UserChannelJoinFullFragment } from 'graphqls/fragments';
import { MY_USER_CHANNEL_JOINS } from 'graphqls/queries/MY_USER_CHANNEL_JOINS';
import { MyUserChannelJoins, MyUserChannelJoinsVariables } from 'graphqls/queries/__generated__/MyUserChannelJoins';
import { useCallback } from 'react';
import { UpdateUserChannelJoin, UpdateUserChannelJoinVariables } from './__generated__/UpdateUserChannelJoin';

export const UPDATE_USER_CHANNEL_JOIN = gql`
  ${UserChannelJoinFullFragment}
  mutation UpdateUserChannelJoin(
    $userChannelJoinId: String!
    $userChannelJoinUpdatePayload: UserChannelJoinUpdatePayload!
  ) {
    updateUserChannelJoin(
      userChannelJoinId: $userChannelJoinId
      userChannelJoinUpdatePayload: $userChannelJoinUpdatePayload
    ) {
      ...UserChannelJoinFull
    }
  }
`;

export function useUpdateUserChannelJoin() {
  const [updateUserChannelJoinMutation] = useMutation<UpdateUserChannelJoin, UpdateUserChannelJoinVariables>(
    UPDATE_USER_CHANNEL_JOIN,
  );
  const updateUserChannelJoin = useCallback(
    (variables: UpdateUserChannelJoinVariables) => {
      updateUserChannelJoinMutation({
        variables,
        update: (cache, { data: mutationData }) => {
          if (mutationData) {
            const prevUserChannelJoinList = cache.readQuery<MyUserChannelJoins, MyUserChannelJoinsVariables>({
              query: MY_USER_CHANNEL_JOINS,
              variables: { teamId: mutationData.updateUserChannelJoin.teamId },
            });

            if (prevUserChannelJoinList) {
              const myUserChannelJoins = prevUserChannelJoinList.myUserChannelJoins.map(userChannelJoin => {
                if (userChannelJoin._id === mutationData.updateUserChannelJoin._id) {
                  return mutationData.updateUserChannelJoin;
                }
                return userChannelJoin;
              });

              cache.writeQuery<MyUserChannelJoins, MyUserChannelJoinsVariables>({
                query: MY_USER_CHANNEL_JOINS,
                variables: { teamId: mutationData.updateUserChannelJoin.teamId },
                data: { myUserChannelJoins },
              });
            }
          }
        },
      });
    },
    [updateUserChannelJoinMutation],
  );

  return { updateUserChannelJoin };
}
