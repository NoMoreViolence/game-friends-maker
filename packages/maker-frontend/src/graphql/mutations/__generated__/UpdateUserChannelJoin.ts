/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserChannelJoinUpdatePayload } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserChannelJoin
// ====================================================

export interface UpdateUserChannelJoin_updateUserChannelJoin_team {
  __typename: "Team";
  _id: string;
  name: string;
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

export interface UpdateUserChannelJoin_updateUserChannelJoin_channel_team {
  __typename: "Team";
  _id: string;
  name: string;
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
  firstChatCreatedAt: any;
  lastChatCreatedAt: any;
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
