import gql from 'graphql-tag';

export const TeamFullFragment = gql`
  fragment TeamFull on Team {
    _id
    name
    introduction
    createdAt
    updatedAt
    deleted
  }
`;
