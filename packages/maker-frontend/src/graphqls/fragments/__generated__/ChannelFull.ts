/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelFull
// ====================================================

export interface ChannelFull_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface ChannelFull_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: ChannelFull_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface ChannelFull_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: ChannelFull_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface ChannelFull {
  __typename: "Channel";
  _id: string;
  name: string;
  teamId: string;
  team: ChannelFull_team;
  firstChatCreatedAt: any;
  lastChatCreatedAt: any;
  createdAt: any;
  updatedAt: any;
}
