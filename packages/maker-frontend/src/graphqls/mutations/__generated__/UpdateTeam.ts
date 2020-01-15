/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateTeamPayload } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTeam
// ====================================================

export interface UpdateTeam_updateTeam_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateTeam_updateTeam_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: UpdateTeam_updateTeam_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface UpdateTeam_updateTeam {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: UpdateTeam_updateTeam_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UpdateTeam {
  updateTeam: UpdateTeam_updateTeam;
}

export interface UpdateTeamVariables {
  teamId: string;
  nextTeam: UpdateTeamPayload;
}
