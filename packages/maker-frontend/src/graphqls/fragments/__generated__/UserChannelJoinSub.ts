/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserChannelJoinSub
// ====================================================

export interface UserChannelJoinSub_team {
  __typename: "Team";
  _id: string;
  name: string;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UserChannelJoinSub_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UserChannelJoinSub_channel {
  __typename: "Channel";
  _id: string;
  name: string;
  teamId: string;
  createdAt: any;
  updatedAt: any;
}

export interface UserChannelJoinSub {
  __typename: "UserChannelJoin";
  _id: string;
  teamId: string;
  team: UserChannelJoinSub_team;
  userId: string;
  user: UserChannelJoinSub_user;
  channelId: string;
  channel: UserChannelJoinSub_channel;
  firstChatReadAt: any;
  lastChatReadAt: any;
  createdAt: any;
  updatedAt: any;
}
