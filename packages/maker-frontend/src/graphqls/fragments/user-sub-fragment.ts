import gql from 'graphql-tag';

export const UserSubFragment = gql`
  fragment UserSub on User {
    _id
    name
    email
    createdAt
    updatedAt
  }
`;
