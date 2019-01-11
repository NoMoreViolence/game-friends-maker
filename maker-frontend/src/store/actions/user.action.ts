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
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export type LOGIN_FAILURE = { message: string };
export const LOGOUT = 'LOGOUT';
export type LOGOUT = {};

export const AUTO_LOGIN = 'AUTO_LOGIN';
export type AUTO_LOGIN = { token: string };
export const AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS';
export type AUTO_LOGIN_SUCCESS = { admin: boolean; username: string; email: string; token: string };
export const AUTO_LOGIN_FAILURE = 'AUTO_LOGIN_FAILURE';
export type AUTO_LOGIN_FAILURE = { message: string };

export const REGISTER = 'REGISTER';
export type REGISTER = { username: string; email: string; password: string };
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export type REGISTER_SUCCESS = { username: string; email: string };
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export type REGISTER_FAILURE = { message: string };

export const userActions = {
  login: createAction(LOGIN, (data: LOGIN) => data),
  autoLogin: createAction(AUTO_LOGIN, (data: AUTO_LOGIN) => data),
  register: createAction(REGISTER, (data: REGISTER) => data),
  logout: createAction(LOGOUT)
};

export type UserActions =
  | Login
  | LOGIN_SUCCESS
  | LOGIN_FAILURE
  | LOGOUT
  | AUTO_LOGIN
  | AUTO_LOGIN_SUCCESS
  | AUTO_LOGIN_FAILURE
  | REGISTER
  | REGISTER_SUCCESS
  | REGISTER_FAILURE;
