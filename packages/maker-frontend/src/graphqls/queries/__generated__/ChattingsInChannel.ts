/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetChattingsPayload } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ChattingsInChannel
// ====================================================

export interface ChattingsInChannel_chattingsInChannel_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface ChattingsInChannel_chattingsInChannel {
  __typename: "Chat";
  _id: string;
  text: string;
  type: string;
  userId: string;
  user: ChattingsInChannel_chattingsInChannel_user;
  channelId: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface ChattingsInChannel {
  chattingsInChannel: ChattingsInChannel_chattingsInChannel[];
}

export interface ChattingsInChannelVariables {
  channelId: string;
  getChattingsPayload?: GetChattingsPayload | null;
}
