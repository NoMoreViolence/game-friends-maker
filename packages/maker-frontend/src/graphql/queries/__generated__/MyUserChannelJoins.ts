/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyUserChannelJoins
// ====================================================

export interface MyUserChannelJoins_myUserChannelJoins_team {
  __typename: "Team";
  _id: string;
  name: string;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyUserChannelJoins_myUserChannelJoins_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyUserChannelJoins_myUserChannelJoins_channel_team {
  __typename: "Team";
  _id: string;
  name: string;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyUserChannelJoins_myUserChannelJoins_channel {
  __typename: "Channel";
  _id: string;
  name: string;
  teamId: string;
  team: MyUserChannelJoins_myUserChannelJoins_channel_team;
  firstChatCreatedAt: any;
  lastChatCreatedAt: any;
  createdAt: any;
  updatedAt: any;
}

export interface MyUserChannelJoins_myUserChannelJoins {
  __typename: "UserChannelJoin";
  _id: string;
  teamId: string;
  team: MyUserChannelJoins_myUserChannelJoins_team;
  userId: string;
  user: MyUserChannelJoins_myUserChannelJoins_user;
  channelId: string;
  channel: MyUserChannelJoins_myUserChannelJoins_channel;
  firstChatReadAt: any;
  lastChatReadAt: any;
  createdAt: any;
  updatedAt: any;
}

export interface MyUserChannelJoins {
  myUserChannelJoins: MyUserChannelJoins_myUserChannelJoins[];
}

export interface MyUserChannelJoinsVariables {
  teamId: string;
}
