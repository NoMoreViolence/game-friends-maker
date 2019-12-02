import gql from 'graphql-tag';

export const GenreFullFragment = gql`
  fragment GenreFull on Genre {
    _id
    name
    createdAt
    updatedAt
  }
`;
