/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserChannelJoinSub
// ====================================================

export interface UserChannelJoinSub_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UserChannelJoinSub {
  __typename: "UserChannelJoin";
  _id: string;
  teamId: string;
  userId: string;
  user: UserChannelJoinSub_user;
  channelId: string;
  firstChatReadAt: any;
  lastChatReadAt: any;
  createdAt: any;
  updatedAt: any;
}
