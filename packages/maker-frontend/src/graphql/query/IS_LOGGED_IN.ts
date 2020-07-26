import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { IsUserLoggedIn } from './__generated__/IsUserLoggedIn';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export function useIsLoggedIn() {
  const { data } = useQuery<IsUserLoggedIn>(IS_LOGGED_IN);
  return data?.isLoggedIn;
}
