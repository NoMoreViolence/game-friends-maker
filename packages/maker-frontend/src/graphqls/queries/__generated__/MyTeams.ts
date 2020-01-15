/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyTeams
// ====================================================

export interface MyTeams_myTeams_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyTeams_myTeams_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface MyTeams_myTeams_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: MyTeams_myTeams_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface MyTeams_myTeams_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: MyTeams_myTeams_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyTeams_myTeams {
  __typename: "TeamUserJoin";
  _id: string;
  userId: string;
  user: MyTeams_myTeams_user;
  teamId: string;
  team: MyTeams_myTeams_team;
  muted: boolean;
  userState: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyTeams_currentLocation {
  __typename: "CurrentLocation";
  currentTeamUserJoinId: string | null;
}

export interface MyTeams {
  myTeams: MyTeams_myTeams[];
  currentLocation: MyTeams_currentLocation;
}
