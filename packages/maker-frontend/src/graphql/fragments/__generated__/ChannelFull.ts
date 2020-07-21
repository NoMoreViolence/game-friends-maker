/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelFull
// ====================================================

export interface ChannelFull_team {
  __typename: "Team";
  _id: string;
  name: string;
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
