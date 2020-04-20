/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTeamPayload } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTeam
// ====================================================

export interface CreateTeam_createTeam_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface CreateTeam_createTeam_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface CreateTeam_createTeam_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: CreateTeam_createTeam_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface CreateTeam_createTeam_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: CreateTeam_createTeam_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface CreateTeam_createTeam {
  __typename: "TeamUserJoin";
  _id: string;
  userId: string;
  user: CreateTeam_createTeam_user;
  teamId: string;
  team: CreateTeam_createTeam_team;
  muted: boolean;
  userState: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface CreateTeam {
  createTeam: CreateTeam_createTeam;
}

export interface CreateTeamVariables {
  createTeamPayload: CreateTeamPayload;
}
