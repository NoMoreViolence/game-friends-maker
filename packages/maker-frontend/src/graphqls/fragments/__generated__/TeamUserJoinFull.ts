/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TeamUserJoinFull
// ====================================================

export interface TeamUserJoinFull_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoinFull_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface TeamUserJoinFull_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: TeamUserJoinFull_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface TeamUserJoinFull_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: TeamUserJoinFull_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoinFull {
  __typename: "TeamUserJoin";
  _id: string;
  userId: string;
  user: TeamUserJoinFull_user;
  teamId: string;
  team: TeamUserJoinFull_team;
  muted: boolean;
  userState: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}
