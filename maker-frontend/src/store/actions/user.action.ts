import { createAction } from 'redux-actions';
import { Action } from 'redux';

export const LOGIN = 'LOGIN';
export type LOGIN = { email: string; password: string };
export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: LOGIN) {}
}
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = { admin: boolean; username: string; email: string; token: string };
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: LOGIN_SUCCESS) {}
}
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export type LOGIN_FAILURE = { message: string };
export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload: LOGIN_FAILURE) {}
}
export const LOGOUT = 'LOGOUT';
export type LOGOUT = {};
export class Logout implements Action {
  readonly type = LOGOUT;
}

export const AUTO_LOGIN = 'AUTO_LOGIN';
export type AUTO_LOGIN = { token: string };
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
  constructor(public payload: AUTO_LOGIN) {}
}
export const AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS';
export type AUTO_LOGIN_SUCCESS = { admin: boolean; username: string; email: string; token: string };
export class AutoLoginSuccess implements Action {
  readonly type = AUTO_LOGIN_SUCCESS;
  constructor(public payload: AUTO_LOGIN_SUCCESS) {}
}
export const AUTO_LOGIN_FAILURE = 'AUTO_LOGIN_FAILURE';
export type AUTO_LOGIN_FAILURE = { message: string };
export class AutoLoginFailure implements Action {
  readonly type = AUTO_LOGIN_FAILURE;
  constructor(public payload: AUTO_LOGIN_FAILURE) {}
}

export const REGISTER = 'REGISTER';
export type REGISTER = { username: string; email: string; password: string };
export class Register implements Action {
  readonly type = REGISTER;
  constructor(public payload: REGISTER) {}
}
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export type REGISTER_SUCCESS = { username: string; email: string };
export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
  constructor(public payload: REGISTER_SUCCESS) {}
}
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export type REGISTER_FAILURE = { message: string };
export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILURE;
  constructor(public payload: REGISTER_FAILURE) {}
}

export const userActions = {
  login: createAction(LOGIN, (data: LOGIN) => data),
  autoLogin: createAction(AUTO_LOGIN, (data: AUTO_LOGIN) => data),
  register: createAction(REGISTER, (data: REGISTER) => data),
  logout: createAction(LOGOUT)
};

export type UserActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | AutoLogin
  | AutoLoginSuccess
  | AutoLoginFailure
  | Register
  | RegisterSuccess
  | RegisterFailure;
