import { Action } from 'redux';

export enum SignActionTypes {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE'
}

export interface Login extends Action {
  type: SignActionTypes.LOGIN;
}
export interface LoginSuccess extends Action {
  type: SignActionTypes.LOGIN_SUCCESS;
}
export interface LoginFailure extends Action {
  type: SignActionTypes.LOGIN_FAILURE;
}

export type SignActions = Login | LoginSuccess | LoginFailure;
