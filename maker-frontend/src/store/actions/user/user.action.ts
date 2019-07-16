import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';
import { UserActionTypes } from './user.type';
import { GoogleTokenPayload } from '@models';

export interface RegisterPayload extends GoogleTokenPayload {}
export interface Register extends Action {
  readonly type: UserActionTypes.REGISTER;
  payload: RegisterPayload;
}

export interface RegisterSuccessPayload {
  token: string;
  expiresIn: number;
}
export interface RegisterSuccess extends Action {
  readonly type: UserActionTypes.REGISTER_SUCCESS;
  payload: RegisterSuccessPayload;
}

export interface RegisterFailure extends Action {
  readonly type: UserActionTypes.REGISTER_FAILURE;
}

export const userActions = {
  register: createStandardAction(UserActionTypes.REGISTER)<RegisterPayload>(),
  registerSuccess: createStandardAction(UserActionTypes.REGISTER_SUCCESS)<RegisterSuccessPayload>(),
  registerFailure: createStandardAction(UserActionTypes.REGISTER_FAILURE)(),
};

export type UserActions = Register | RegisterSuccess | RegisterFailure;
