import { Action } from 'redux';

export enum SignActionTypes {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE'
}

export interface ILoginPayload {
  name: string;
  email: string;
  googleId: string;
  googleIdToken: string;
}
export interface ILogin extends Action {
  type: SignActionTypes.LOGIN;
  payload: ILoginPayload;
}

export interface ILoginSuccess extends Action {
  type: SignActionTypes.LOGIN_SUCCESS;
}

export interface ILoginFailure extends Action {
  type: SignActionTypes.LOGIN_FAILURE;
}

export const loginActions = {
  login: (payload: ILoginPayload): ILogin => ({
    type: SignActionTypes.LOGIN,
    payload
  })
};

export type SignActions = ILogin | ILoginSuccess | ILoginFailure;
