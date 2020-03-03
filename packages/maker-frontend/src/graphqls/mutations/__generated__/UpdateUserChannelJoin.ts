/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserChannelJoinUpdatePayload } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserChannelJoin
// ====================================================

export interface UpdateUserChannelJoin_updateUserChannelJoin_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateUserChannelJoin_updateUserChannelJoin_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: UpdateUserChannelJoin_updateUserChannelJoin_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface UpdateUserChannelJoin_updateUserChannelJoin_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: UpdateUserChannelJoin_updateUserChannelJoin_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UpdateUserChannelJoin_updateUserChannelJoin_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UpdateUserChannelJoin_updateUserChannelJoin_channel_team_game_genres {
  __typename: "Genre";
  _id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateUserChannelJoin_updateUserChannelJoin_channel_team_game {
  __typename: "Game";
  _id: string;
  name: string;
  genreIds: string[];
  genres: UpdateUserChannelJoin_updateUserChannelJoin_channel_team_game_genres[];
  createdAt: any;
  updatedAt: any;
}

export interface UpdateUserChannelJoin_updateUserChannelJoin_channel_team {
  __typename: "Team";
  _id: string;
  name: string;
  gameId: string;
  game: UpdateUserChannelJoin_updateUserChannelJoin_channel_team_game;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UpdateUserChannelJoin_updateUserChannelJoin_channel {
  __typename: "Channel";
  _id: string;
  name: string;
  teamId: string;
  team: UpdateUserChannelJoin_updateUserChannelJoin_channel_team;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateUserChannelJoin_updateUserChannelJoin {
  __typename: "UserChannelJoin";
  _id: string;
  teamId: string;
  team: UpdateUserChannelJoin_updateUserChannelJoin_team;
  userId: string;
  user: UpdateUserChannelJoin_updateUserChannelJoin_user;
  channelId: string;
  channel: UpdateUserChannelJoin_updateUserChannelJoin_channel;
  firstChatReadAt: any;
  lastChatReadAt: any;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateUserChannelJoin {
  updateUserChannelJoin: UpdateUserChannelJoin_updateUserChannelJoin;
}

export interface UpdateUserChannelJoinVariables {
  userChannelJoinId: string;
  userChannelJoinUpdatePayload: UserChannelJoinUpdatePayload;
}
