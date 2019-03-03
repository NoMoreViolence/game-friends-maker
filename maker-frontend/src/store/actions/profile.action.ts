import { createAction } from 'redux-actions';
import { Action } from 'redux';

export const GET_MY_PROFILE = 'GET_MY_PROFILE';
export type GET_MY_PROFILE = string;
export class GetMyProfile implements Action {
  readonly type = GET_MY_PROFILE;
  constructor(public payload: GET_MY_PROFILE) {}
}
export const GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE_SUCCESS';
export type GET_MY_PROFILE_SUCCESS = {
  username: string;
  introduce: string;
  pictureUrl: string;
  visibility: 1 | 0;
};
export class GetMyProfileSuccess implements Action {
  readonly type = GET_MY_PROFILE_SUCCESS;
  constructor(public payload: GET_MY_PROFILE_SUCCESS) {}
}
export const GET_MY_PROFILE_FAILURE = 'GET_MY_PROFILE_FAILURE';
export type GET_MY_PROFILE_FAILURE = {};
export class GetMyProfileFailure implements Action {
  readonly type = GET_MY_PROFILE_FAILURE;
  constructor(public payload: GET_MY_PROFILE_FAILURE) {}
}

export const CHANGE_PROFILE_MODE = 'CHANGE_PROFILE_MODE';
export type CHANGE_PROFILE_MODE = boolean;
export class ChangeProfileMode implements Action {
  readonly type = CHANGE_PROFILE_MODE;
  constructor(public payload: CHANGE_PROFILE_MODE) {}
}

export const UPLOAD_PROFILE_PICTURE = 'UPLOAD_PROFILE_PICTURE';
export type UPLOAD_PROFILE_PICTURE = { token: string; image: File };
export class UploadProfilePicture implements Action {
  readonly type = UPLOAD_PROFILE_PICTURE;
  constructor(public payload: UPLOAD_PROFILE_PICTURE) {}
}
export const UPLOAD_PROFILE_PICTURE_SUCCESS = 'UPLOAD_PROFILE_PICTURE_SUCCESS';
export class UploadProfilePictureSuccess implements Action {
  readonly type = UPLOAD_PROFILE_PICTURE_SUCCESS;
}
export const UPLOAD_PROFILE_PICTURE_FAILURE = 'UPLOAD_PROFILE_PICTURE_FAILURE';
export class UploadProfilePictureFailure implements Action {
  readonly type = UPLOAD_PROFILE_PICTURE_FAILURE;
}

export const DELETE_PROFILE_PICTURE = 'DELETE_PROFILE_PICTURE';
export type DELETE_PROFILE_PICTURE = { token: string };
export class DeleteProfilePicture implements Action {
  readonly type = DELETE_PROFILE_PICTURE;
  constructor(public payload: DELETE_PROFILE_PICTURE) {}
}
export const DELETE_PROFILE_PICTURE_SUCCESS = 'DELETE_PROFILE_PICTURE_SUCCESS';
export class DeleteProfilePictureSuccess implements Action {
  readonly type = DELETE_PROFILE_PICTURE_SUCCESS;
}
export const DELETE_PROFILE_PICTURE_FAILURE = 'DELETE_PROFILE_PICTURE_FAILURE';
export class DeleteProfilePictureFailure implements Action {
  readonly type = DELETE_PROFILE_PICTURE_FAILURE;
}

export const CHANGE_PROFILE = 'CHANGE_PROFILE';
export type CHANGE_PROFILE = { token: string; username: string; introduce: string };
export class ChangeProfile implements Action {
  readonly type = CHANGE_PROFILE;
  constructor(public payload: CHANGE_PROFILE) {}
}
export const CHANGE_PROFILE_SUCCESS = 'CHANGE_PROFILE_SUCCESS';
export type CHANGE_PROFILE_SUCCESS = CHANGE_PROFILE;
export class ChangeProfileSuccess implements Action {
  readonly type = CHANGE_PROFILE_SUCCESS;
  constructor(public payload: CHANGE_PROFILE_SUCCESS) {}
}
export const CHANGE_PROFILE_FAILURE = 'CHANGE_PROFILE_FAILURE';
export type CHANGE_PROFILE_FAILURE = {};
export class ChangeProfileFailure implements Action {
  readonly type = CHANGE_PROFILE_FAILURE;
  constructor(public payload: CHANGE_PROFILE_FAILURE) {}
}

export const CHANGE_PROFILE_VISIBILITY = 'CHANGE_PROFILE_VISIBILITY';
export type CHANGE_PROFILE_VISIBILITY = { token: string; visibility: 1 | 0 };
export class ChangeProfileVisibility implements Action {
  readonly type = CHANGE_PROFILE_VISIBILITY;
  constructor(public payload: CHANGE_PROFILE_VISIBILITY) {}
}
export const CHANGE_PROFILE_VISIBILITY_SUCCESS = 'CHANGE_PROFILE_VISIBILITY_SUCCESS';
export type CHANGE_PROFILE_VISIBILITY_SUCCESS = {};
export class ChangeProfileVisibilitySuccess implements Action {
  readonly type = CHANGE_PROFILE_VISIBILITY_SUCCESS;
  constructor(public payload: CHANGE_PROFILE_VISIBILITY_SUCCESS) {}
}
export const CHANGE_PROFILE_VISIBILITY_FAILURE = 'CHANGE_PROFILE_VISIBILITY_FAILURE';
export type CHANGE_PROFILE_VISIBILITY_FAILURE = {};
export class ChangeProfileVisibilityFailure implements Action {
  readonly type = CHANGE_PROFILE_VISIBILITY_FAILURE;
  constructor(public payload: CHANGE_PROFILE_VISIBILITY_FAILURE) {}
}

export const profileActions = {
  getMyProfile: createAction(GET_MY_PROFILE, (data: GET_MY_PROFILE) => data),
  changeProfileMode: createAction(CHANGE_PROFILE_MODE, (data: CHANGE_PROFILE_MODE) => data),
  uploadProfilePicture: createAction(UPLOAD_PROFILE_PICTURE, (data: UPLOAD_PROFILE_PICTURE) => data),
  deleteProfilePicture: createAction(DELETE_PROFILE_PICTURE, (data: DELETE_PROFILE_PICTURE) => data),
  changeProfile: createAction(CHANGE_PROFILE, (data: CHANGE_PROFILE) => data),
  changeProfileVisibility: createAction(CHANGE_PROFILE_VISIBILITY, (data: CHANGE_PROFILE_VISIBILITY) => data)
};

export type ProfileActions =
  | GetMyProfile
  | GetMyProfileSuccess
  | GetMyProfileFailure
  | ChangeProfileMode
  | UploadProfilePicture
  | UploadProfilePictureSuccess
  | UploadProfilePictureFailure
  | DeleteProfilePicture
  | DeleteProfilePictureSuccess
  | DeleteProfilePictureFailure
  | ChangeProfile
  | ChangeProfileSuccess
  | ChangeProfileFailure
  | ChangeProfileVisibility
  | ChangeProfileVisibilitySuccess
  | ChangeProfileVisibilityFailure;
