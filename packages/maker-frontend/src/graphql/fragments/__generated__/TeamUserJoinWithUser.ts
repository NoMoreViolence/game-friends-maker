/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TeamUserJoinWithUser
// ====================================================

export interface TeamUserJoinWithUser_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoinWithUser {
  __typename: "TeamUserJoin";
  _id: string;
  displayName: string;
  userId: string;
  user: TeamUserJoinWithUser_user;
  teamId: string;
  muted: boolean;
  userState: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}
