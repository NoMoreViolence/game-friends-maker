import gql from 'graphql-tag';
import { UserFullFragment } from '../fragments/user';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { User } from './__generated__/User';
import { useRouter } from 'helpers';
import { useUserStateDispatch } from 'context';

export const USER = gql`
  ${UserFullFragment}
  query User {
    user {
      ...UserFull
    }
  }
`;

export function useUser(option?: QueryHookOptions<User>) {
  const { push } = useRouter();
  const dispatch = useUserStateDispatch();
  return useQuery<User>(USER, {
    fetchPolicy: 'cache-first',
    onError: () => {
      localStorage.removeItem('token');
      push('/');
    },
    onCompleted: userState =>
      dispatch({
        type: 'SAVE',
        userState: userState.user,
      }),
    ...option,
  });
}
