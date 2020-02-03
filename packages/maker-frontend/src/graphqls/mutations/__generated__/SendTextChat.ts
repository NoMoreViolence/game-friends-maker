/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendTextChat
// ====================================================

export interface SendTextChat_sendTextChat {
  __typename: "Chat";
  _id: string;
  text: string;
  userId: string;
  channelId: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface SendTextChat {
  sendTextChat: SendTextChat_sendTextChat;
}

export interface SendTextChatVariables {
  channelId: string;
  text: string;
}
