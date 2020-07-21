/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NextCurrentUserChannelJoinId } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCurrentUserChannelJoinId
// ====================================================

export interface UpdateCurrentUserChannelJoinId_updateCurrentUserChannelJoinId {
  __typename: "CurrentUserChannelJoinId";
  currentUserChannelJoinId: string | null;
}

export interface UpdateCurrentUserChannelJoinId {
  updateCurrentUserChannelJoinId: UpdateCurrentUserChannelJoinId_updateCurrentUserChannelJoinId | null;
}

export interface UpdateCurrentUserChannelJoinIdVariables {
  nextCurrentUserChannelJoinId: NextCurrentUserChannelJoinId;
}
