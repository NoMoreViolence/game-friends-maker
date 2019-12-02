import gql from 'graphql-tag';
import { UserFullFragment } from './../fragments/user-fragment';

export const USER = gql`
  ${UserFullFragment}
  query User {
    user {
      ...UserFull
    }
  }
`;
