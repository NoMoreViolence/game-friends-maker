import gql from 'graphql-tag';
import { UserFullFragment } from './../fragments/user-fragment';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { User } from './__generated__/User';

export const USER = gql`
  ${UserFullFragment}
  query User {
    user {
      ...UserFull
    }
  }
`;

export function useUser(option?: QueryHookOptions<User>) {
  return useQuery<User>(USER, { fetchPolicy: 'cache-first', ...option });
}
