import { Action } from 'redux';
import { RouteComponentProps } from 'react-router';

export enum SignActionTypes {
  REGISTER = 'REGISTER',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  GET_MY_INFO = 'GET_MY_INFO',
  GET_MY_INFO_SUCCESS = 'GET_MY_INFO_SUCCESS',
  GET_MY_INFO_FAILURE = 'GET_MY_INFO_FAILURE'
}

export interface IGoogleTokenPayload {
  name: string;
  email: string;
  googleId: string;
  googleIdToken: string;
}

export interface IRegisterPayload extends IGoogleTokenPayload {}
export interface IRegister extends Action {
  type: SignActionTypes.REGISTER;
  payload: IRegisterPayload;
}

export interface IRegisterSuccessPayload {
  token: string;
  expiresIn: number;
}
export interface IRegisterSuccess extends Action {
  type: SignActionTypes.REGISTER_SUCCESS;
  payload: IRegisterSuccessPayload;
}

export interface IRegisterFailure extends Action {
  type: SignActionTypes.REGISTER_FAILURE;
}

export interface ILoginPayload extends IGoogleTokenPayload {}
export interface ILogin extends Action {
  type: SignActionTypes.LOGIN;
  payload: ILoginPayload;
}
export interface ILoginSuccessPayload {
  token: string;
  expiresIn: number;
}
export interface ILoginSuccess extends Action {
  type: SignActionTypes.LOGIN_SUCCESS;
  payload: ILoginSuccessPayload;
}
export interface ILoginFailure extends Action {
  type: SignActionTypes.LOGIN_FAILURE;
}

export interface IGetMyInfoPayload {
  token: string;
}
export interface IGetMyInfo {
  type: SignActionTypes.GET_MY_INFO;
  payload: IGetMyInfoPayload;
}
export interface IGetMyInfoSuccessPayload {
  email: string;
  name: string;
}
export interface IGetMyInfoSuccess {
  type: SignActionTypes.GET_MY_INFO_SUCCESS;
  payload: IGetMyInfoSuccessPayload;
}
export interface IGetMyInfoFailure {
  type: SignActionTypes.GET_MY_INFO_FAILURE;
}

export const signActions = {
  register: (payload: IRegisterPayload): IRegister => ({
    type: SignActionTypes.REGISTER,
    payload
  }),
  login: (payload: ILoginPayload): ILogin => ({
    type: SignActionTypes.LOGIN,
    payload
  }),
  getMyInfo: (payload: IGetMyInfoPayload): IGetMyInfo => ({
    type: SignActionTypes.GET_MY_INFO,
    payload
  })
};

export type SignActions =
  | IRegister
  | IRegisterSuccess
  | IRegisterFailure
  | ILogin
  | ILoginSuccess
  | ILoginFailure
  | IGetMyInfo
  | IGetMyInfoSuccess
  | IGetMyInfoFailure;
