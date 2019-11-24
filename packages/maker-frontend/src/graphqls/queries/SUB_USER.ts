import gql from 'graphql-tag';
import { UserSubFragment } from 'graphqls/fragments';

export const SUB_USER = gql`
  ${UserSubFragment}
  query SubUser {
    user {
      ...UserSub
    }
  }
`;
