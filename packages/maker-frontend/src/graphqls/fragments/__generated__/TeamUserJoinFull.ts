/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TeamUserJoinFull
// ====================================================

export interface TeamUserJoinFull_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoinFull_team {
  __typename: "Team";
  _id: string;
  name: string;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoinFull {
  __typename: "TeamUserJoin";
  _id: string;
  userId: string;
  user: TeamUserJoinFull_user;
  teamId: string;
  team: TeamUserJoinFull_team;
  muted: boolean;
  userState: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}
