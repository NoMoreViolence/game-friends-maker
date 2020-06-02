/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeamUserJoins
// ====================================================

export interface TeamUserJoins_teamUserJoins_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoins_teamUserJoins {
  __typename: "TeamUserJoin";
  _id: string;
  displayName: string;
  userId: string;
  user: TeamUserJoins_teamUserJoins_user;
  teamId: string;
  muted: boolean;
  userState: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface TeamUserJoins {
  teamUserJoins: TeamUserJoins_teamUserJoins[];
}

export interface TeamUserJoinsVariables {
  teamId: string;
}
