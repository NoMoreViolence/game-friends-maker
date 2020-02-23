/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserChannelJoinFull
// ====================================================

export interface UserChannelJoinFull_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface UserChannelJoinFull_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: UserChannelJoinFull_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface UserChannelJoinFull_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: UserChannelJoinFull_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UserChannelJoinFull_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UserChannelJoinFull_channel_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface UserChannelJoinFull_channel_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: UserChannelJoinFull_channel_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface UserChannelJoinFull_channel_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: UserChannelJoinFull_channel_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UserChannelJoinFull_channel {
  __typename: "Channel";
  _id: string;
  name: string;
  teamId: string;
  team: UserChannelJoinFull_channel_team;
  createdAt: any;
  updatedAt: any;
}

export interface UserChannelJoinFull {
  __typename: "UserChannelJoin";
  _id: string;
  teamId: string;
  team: UserChannelJoinFull_team;
  userId: string;
  user: UserChannelJoinFull_user;
  channelId: string;
  channel: UserChannelJoinFull_channel;
  firstChatReadAt: any;
  lastChatReadAt: any;
  createdAt: any;
  updatedAt: any;
}
