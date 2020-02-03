import gql from 'graphql-tag';
import { GenreFullFragment } from './genre';

export const GameFullFragment = gql`
  ${GenreFullFragment}
  fragment GameFull on Game {
    _id
    name
    genreIds
    genres {
      ...GenreFull
    }
    createdAt
    updatedAt
  }
`;
