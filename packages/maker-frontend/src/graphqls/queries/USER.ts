import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useRouter from 'use-react-router';
import { UserFullFragment } from '../fragments/user';
import { User } from './__generated__/User';

export const USER = gql`
  ${UserFullFragment}
  query User {
    user {
      ...UserFull
    }
  }
`;

export function useUser() {
  const {
    history: { push },
  } = useRouter();
  return useQuery<User>(USER, {
    fetchPolicy: 'cache-first',
    onError: () => {
      localStorage.removeItem('token');
      push('/');
    },
  });
}
