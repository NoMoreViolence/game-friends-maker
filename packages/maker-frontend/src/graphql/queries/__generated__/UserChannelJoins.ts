/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserChannelJoins
// ====================================================

export interface UserChannelJoins_userChannelJoins_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UserChannelJoins_userChannelJoins {
  __typename: "UserChannelJoin";
  _id: string;
  teamId: string;
  userId: string;
  user: UserChannelJoins_userChannelJoins_user;
  channelId: string;
  firstChatReadAt: any;
  lastChatReadAt: any;
  createdAt: any;
  updatedAt: any;
}

export interface UserChannelJoins {
  userChannelJoins: UserChannelJoins_userChannelJoins[];
}

export interface UserChannelJoinsVariables {
  channelId: string;
}
