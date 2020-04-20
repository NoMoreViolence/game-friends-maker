/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NextCurrentTeamUserJoinId } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCurrentTeamUserJoinId
// ====================================================

export interface UpdateCurrentTeamUserJoinId_updateCurrentTeamUserJoinId {
  __typename: "CurrentTeamUserJoinId";
  currentTeamUserJoinId: string | null;
}

export interface UpdateCurrentTeamUserJoinId {
  updateCurrentTeamUserJoinId: UpdateCurrentTeamUserJoinId_updateCurrentTeamUserJoinId | null;
}

export interface UpdateCurrentTeamUserJoinIdVariables {
  nextCurrentTeamUserJoinId: NextCurrentTeamUserJoinId;
}
