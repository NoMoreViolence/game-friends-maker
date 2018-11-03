import { Action } from '@ngrx/store';
import { SignInSuccessModel, SignUpSuccessModel } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

// Sign In
const SIGN_IN = 'SIGN_IN';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
// Auto Sign in
const AUTO_SIGN_IN = 'AUTO_SIGN_IN';
const AUTO_SIGN_IN_SUCCESS = 'AUTO_SIGN_IN_SUCCESS';
const AUTO_SIGN_IN_FAILURE = 'AUTO_SIGN_IN_FAILURE';
// Sign Up
const SIGN_UP = 'SIGN_UP';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

// SignIn
export class SignIn implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: { email: string; password: string }) {}
}
export class SignInSuccess implements Action {
  readonly type = SIGN_IN_SUCCESS;

  constructor(public payload: SignInSuccessModel) {}
}
export class SignInFailure implements Action {
  readonly type = SIGN_IN_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export class AutoSignIn implements Action {
  readonly type = AUTO_SIGN_IN;

  constructor(public payload: void) {}
}
export class AutoSignInSuccess implements Action {
  readonly type = AUTO_SIGN_IN_SUCCESS;

  constructor(public payload: SignInSuccessModel) {}
}
export class AutoSignInFailure implements Action {
  readonly type = AUTO_SIGN_IN_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

// SignUp
export class SignUp implements Action {
  readonly type = SIGN_UP;

  constructor(public payload: { username: string; email: string; password: string }) {}
}
export class SignUpSuccess implements Action {
  readonly type = SIGN_UP_SUCCESS;

  constructor(public payload: SignUpSuccessModel) {}
}
export class SignUpFailure implements Action {
  readonly type = SIGN_UP_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  AUTO_SIGN_IN,
  AUTO_SIGN_IN_SUCCESS,
  AUTO_SIGN_IN_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
};

export type Actions =
  | SignIn
  | SignInSuccess
  | SignInFailure
  | AutoSignIn
  | AutoSignInSuccess
  | AutoSignInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure;
