/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NextCurrentLocation } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCurrentLocation
// ====================================================

export interface UpdateCurrentLocation_updateCurrentLocation {
  __typename: "CurrentLocation";
  currentTeamUserJoinId: string | null;
}

export interface UpdateCurrentLocation {
  updateCurrentLocation: UpdateCurrentLocation_updateCurrentLocation | null;
}

export interface UpdateCurrentLocationVariables {
  nextCurrentLocation: NextCurrentLocation;
}
