import gql from 'graphql-tag';

export const UserFullFragment = gql`
  fragment UserFull on User {
    _id
    name
    email
    createdAt
    updatedAt
    deleted
  }
`;
