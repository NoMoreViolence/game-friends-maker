/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyTeamUserJoins
// ====================================================

export interface MyTeamUserJoins_myTeamUserJoins_user {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyTeamUserJoins_myTeamUserJoins_team {
  __typename: "Team";
  _id: string;
  name: string;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyTeamUserJoins_myTeamUserJoins {
  __typename: "TeamUserJoin";
  _id: string;
  displayName: string;
  userId: string;
  user: MyTeamUserJoins_myTeamUserJoins_user;
  teamId: string;
  team: MyTeamUserJoins_myTeamUserJoins_team;
  muted: boolean;
  userState: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface MyTeamUserJoins {
  myTeamUserJoins: MyTeamUserJoins_myTeamUserJoins[];
}
