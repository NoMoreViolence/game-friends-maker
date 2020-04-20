/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TeamFull
// ====================================================

export interface TeamFull_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface TeamFull_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: TeamFull_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface TeamFull {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: TeamFull_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}
