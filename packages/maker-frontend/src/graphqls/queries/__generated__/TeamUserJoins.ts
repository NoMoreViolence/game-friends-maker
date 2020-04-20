/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetTeamUserJoinPayload } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TeamUserJoins
// ====================================================

export interface TeamUserJoins_teamUserJoins_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoins_teamUserJoins_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface TeamUserJoins_teamUserJoins_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: TeamUserJoins_teamUserJoins_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface TeamUserJoins_teamUserJoins_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: TeamUserJoins_teamUserJoins_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoins_teamUserJoins {
  __typename: "TeamUserJoin";
  _id: string;
  userId: string;
  user: TeamUserJoins_teamUserJoins_user;
  teamId: string;
  team: TeamUserJoins_teamUserJoins_team;
  muted: boolean;
  userState: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoins {
  teamUserJoins: TeamUserJoins_teamUserJoins[];
}

export interface TeamUserJoinsVariables {
  getTeamUserJoinPayload: GetTeamUserJoinPayload;
}
