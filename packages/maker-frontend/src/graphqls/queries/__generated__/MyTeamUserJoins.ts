/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyTeamUserJoins
// ====================================================

export interface MyTeamUserJoins_myTeamUserJoins_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyTeamUserJoins_myTeamUserJoins_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface MyTeamUserJoins_myTeamUserJoins_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: MyTeamUserJoins_myTeamUserJoins_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface MyTeamUserJoins_myTeamUserJoins_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: MyTeamUserJoins_myTeamUserJoins_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyTeamUserJoins_myTeamUserJoins {
  __typename: "TeamUserJoin";
  _id: string;
  userId: string;
  user: MyTeamUserJoins_myTeamUserJoins_user;
  teamId: string;
  team: MyTeamUserJoins_myTeamUserJoins_team;
  muted: boolean;
  userState: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyTeamUserJoins {
  myTeamUserJoins: MyTeamUserJoins_myTeamUserJoins[];
}
