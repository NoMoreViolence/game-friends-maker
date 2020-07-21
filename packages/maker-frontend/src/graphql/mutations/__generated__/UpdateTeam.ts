/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTeamPayload } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTeam
// ====================================================

export interface UpdateTeam_updateTeam {
  __typename: "Team";
  _id: string;
  name: string;
  introduction: string;
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
}

export interface UpdateTeam {
  updateTeam: UpdateTeam_updateTeam;
}

export interface UpdateTeamVariables {
  teamId: string;
  nextTeam: UpdateTeamPayload;
}
