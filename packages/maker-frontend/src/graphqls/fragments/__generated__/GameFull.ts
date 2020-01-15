/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GameFull
// ====================================================

export interface GameFull_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface GameFull {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: GameFull_genres[];
  createdAt: any;
  updatedAt: any;
}
