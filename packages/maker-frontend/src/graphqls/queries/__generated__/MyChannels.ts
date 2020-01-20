/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyChannels
// ====================================================

export interface MyChannels_myChannels_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface MyChannels_myChannels_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: MyChannels_myChannels_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface MyChannels_myChannels_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: MyChannels_myChannels_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyChannels_myChannels_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyChannels_myChannels_channel_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface MyChannels_myChannels_channel_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: MyChannels_myChannels_channel_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface MyChannels_myChannels_channel_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: MyChannels_myChannels_channel_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyChannels_myChannels_channel {
  __typename: "Channel";
  _id: string;
  name: string;
  teamId: string;
  team: MyChannels_myChannels_channel_team;
  createdAt: any;
  updatedAt: any;
}

export interface MyChannels_myChannels {
  __typename: "UserChannelJoin";
  _id: string;
  teamId: string;
  team: MyChannels_myChannels_team;
  userId: string;
  user: MyChannels_myChannels_user;
  channelId: string;
  channel: MyChannels_myChannels_channel;
  createdAt: any;
  updatedAt: any;
}

export interface MyChannels {
  myChannels: MyChannels_myChannels[];
}

export interface MyChannelsVariables {
  teamId: string;
}
