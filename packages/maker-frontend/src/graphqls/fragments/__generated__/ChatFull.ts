/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChatFull
// ====================================================

export interface ChatFull_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface ChatFull {
  __typename: "Chat";
  _id: string;
  text: string;
  userId: string;
  user: ChatFull_user;
  channelId: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}
