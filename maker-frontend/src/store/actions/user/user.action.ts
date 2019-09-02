import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';
import { GoogleTokenPayload } from '@models';
import { UserActionTypes } from './user.type';

export interface RegisterPayload extends GoogleTokenPayload {}
export interface Register extends Action {
  readonly type: UserActionTypes.REGISTER;
  payload: RegisterPayload;
}
export interface RegisterSuccessPayload {
  token: string;
}
export interface RegisterSuccess extends Action {
  readonly type: UserActionTypes.REGISTER_SUCCESS;
  payload: RegisterSuccessPayload;
}
export interface RegisterFailure extends Action {
  readonly type: UserActionTypes.REGISTER_FAILURE;
}

export interface LoginPayload extends GoogleTokenPayload {}
export interface Login extends Action {
  readonly type: UserActionTypes.LOGIN;
  payload: LoginPayload;
}
export interface LoginSuccessPayload {
  token: string;
  expiresIn: number;
}
export interface LoginSuccess extends Action {
  readonly type: UserActionTypes.LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
}
export interface LoginFailure extends Action {
  readonly type: UserActionTypes.LOGIN_FAILURE;
}

export interface GetMyInfoPayload {
  token: string;
}
export interface GetMyInfo extends Action {
  readonly type: UserActionTypes.GET_MY_INFO;
  payload: GetMyInfoPayload;
}
export interface GetMyInfoSuccessPayload {
  user: {
    id: number;
    name: string;
    email: string;
  };
}
export interface GetMyInfoSuccess extends Action {
  readonly type: UserActionTypes.GET_MY_INFO_SUCCESS;
  payload: GetMyInfoSuccessPayload;
}
export interface GetMyInfoFailure extends Action {
  readonly type: UserActionTypes.GET_MY_INFO_FAILURE;
}

export const userActions = {
  register: createStandardAction(UserActionTypes.REGISTER)<RegisterPayload>(),
  registerSuccess: createStandardAction(UserActionTypes.REGISTER_SUCCESS)<RegisterSuccessPayload>(),
  registerFailure: createStandardAction(UserActionTypes.REGISTER_FAILURE)(),

  login: createStandardAction(UserActionTypes.LOGIN)<LoginPayload>(),
  loginSuccess: createStandardAction(UserActionTypes.LOGIN_SUCCESS)<LoginSuccessPayload>(),
  loginFailure: createStandardAction(UserActionTypes.LOGIN_FAILURE)(),

  getMyInfo: createStandardAction(UserActionTypes.GET_MY_INFO)<GetMyInfoPayload>(),
  getMyInfoSuccess: createStandardAction(UserActionTypes.GET_MY_INFO_SUCCESS)<GetMyInfoSuccessPayload>(),
  getMyInfoFailure: createStandardAction(UserActionTypes.GET_MY_INFO_FAILURE)(),
};

export type UserActions =
  | Register
  | RegisterSuccess
  | RegisterFailure
  | Login
  | LoginSuccess
  | LoginFailure
  | GetMyInfo
  | GetMyInfoSuccess
  | GetMyInfoFailure;
