/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SendTextChatPayload } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SendTextChat
// ====================================================

export interface SendTextChat_sendTextChat_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface SendTextChat_sendTextChat {
  __typename: "Chat";
  _id: string;
  text: string;
  userId: string;
  user: SendTextChat_sendTextChat_user;
  channelId: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface SendTextChat {
  sendTextChat: SendTextChat_sendTextChat;
}

export interface SendTextChatVariables {
  sendTextChatPayload: SendTextChatPayload;
}
