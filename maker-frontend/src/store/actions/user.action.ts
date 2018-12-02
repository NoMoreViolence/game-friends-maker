import { createAction } from 'redux-actions';
import axios, { AxiosPromise } from 'axios';

export const LOGIN = 'LOGIN';
export type LOGIN = {};
export const LOGIN_PENDING = 'LOGIN_PENDING';
export type LOGIN_PENDING = {};
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = { data: { value: { email: string; username: string; admin: boolean; token: string } } };
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export type LOGIN_FAILURE = { message: string };
export const LOGOUT = 'LOGOUT';
export type LOGOUT = {};

const loginApi = (value: { email: string; password: string }) =>
  axios.post('/api/auth/login', { email: value.email, password: value.password });

export const userActions = {
  login: createAction<AxiosPromise<any>, { email: string; password: string }>(LOGIN, loginApi),
  logout: createAction(LOGOUT)
};
