import gql from 'graphql-tag';
import { UserFullFragment } from 'graphqls/fragments';

export const USER = gql`
  ${UserFullFragment}
  query User {
    user {
      ...UserFull
    }
  }
`;
