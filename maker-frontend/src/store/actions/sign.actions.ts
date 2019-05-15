import { Action } from 'redux';
import { GoogleTokenPayload } from '@models';
import { createStandardAction } from 'typesafe-actions';

export enum SignActionTypes {
  REGISTER = 'REGISTER',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  GET_MY_INFO = 'GET_MY_INFO',
  GET_MY_INFO_SUCCESS = 'GET_MY_INFO_SUCCESS',
  GET_MY_INFO_FAILURE = 'GET_MY_INFO_FAILURE',
}

export interface RegisterPayload extends GoogleTokenPayload {}
export class Register implements Action {
  public readonly type = SignActionTypes.REGISTER;

  public constructor(public payload: RegisterPayload) {}
}
export interface RegisterSuccessPayload {
  token: string;
  expiresIn: number;
}
export class RegisterSuccess implements Action {
  public readonly type = SignActionTypes.REGISTER_SUCCESS;

  public constructor(public payload: RegisterSuccessPayload) {}
}
export class RegisterFailure implements Action {
  public readonly type = SignActionTypes.REGISTER_FAILURE;
}

export interface LoginPayload extends GoogleTokenPayload {}
export class Login implements Action {
  public readonly type = SignActionTypes.LOGIN;

  public constructor(public payload: LoginPayload) {}
}
export interface LoginSuccessPayload {
  token: string;
  expiresIn: number;
}
export class LoginSuccess implements Action {
  public readonly type = SignActionTypes.LOGIN_SUCCESS;

  public constructor(public payload: LoginSuccessPayload) {}
}
export class LoginFailure implements Action {
  public readonly type = SignActionTypes.LOGIN_FAILURE;
}

export interface GetMyInfoPayload {
  token: string;
}
export class GetMyInfo implements Action {
  public readonly type = SignActionTypes.GET_MY_INFO;

  public constructor(public payload: GetMyInfoPayload) {}
}
export interface GetMyInfoSuccessPayload {
  email: string;
  name: string;
}
export class GetMyInfoSuccess implements Action {
  public readonly type = SignActionTypes.GET_MY_INFO_SUCCESS;

  public constructor(public payload: GetMyInfoSuccessPayload) {}
}
export class GetMyInfoFailure implements Action {
  public readonly type = SignActionTypes.GET_MY_INFO_FAILURE;
}

export const signActions = {
  register: createStandardAction(SignActionTypes.REGISTER)<RegisterPayload>(),
  login: createStandardAction(SignActionTypes.LOGIN)<LoginPayload>(),
  getMyInfo: createStandardAction(SignActionTypes.GET_MY_INFO)<GetMyInfoPayload>(),
};

export type SignActions = | Register
| RegisterSuccess
| RegisterFailure
| Login
| LoginSuccess
| LoginFailure
| GetMyInfo
| GetMyInfoSuccess
| GetMyInfoFailure;
