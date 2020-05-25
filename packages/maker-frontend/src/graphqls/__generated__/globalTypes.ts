/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateTeamPayload {
  name: string;
  introduction?: string | null;
}

export interface GetChattingsPayload {
  limit: number;
  direction: number;
  date: string;
}

export interface NextCurrentTeamUserJoinId {
  currentTeamUserJoinId?: string | null;
}

export interface NextCurrentUserChannelJoinId {
  currentUserChannelJoinId?: string | null;
}

export interface SendTextChatPayload {
  _id: string;
  channelId: string;
  text: string;
}

export interface UpdateTeamPayload {
  name?: string | null;
  introduction?: string | null;
}

export interface UserChannelJoinUpdatePayload {
  firstChatReadAt?: string | null;
  lastChatReadAt?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
