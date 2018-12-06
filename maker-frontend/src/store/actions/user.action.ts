import { createAction } from 'redux-actions';

export const LOGIN = 'LOGIN';
export type LOGIN = { email: string; password: string };

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = { admin: boolean; username: string; email: string; token: string };

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export type LOGIN_FAILURE = { message: string };

export const REGISTER = 'REGISTER';
export type REGISTER = { username: string; email: string; password: string };

export const LOGOUT = 'LOGOUT';
export type LOGOUT = {};

export const userActions = {
  login: createAction(LOGIN, (data: LOGIN) => data),
  logout: createAction(LOGOUT)
};
