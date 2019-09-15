import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';
import { LandingActionTypes } from './landing.type';

export interface EmailSubscribePayload {
  email: string;
}
export interface EmailSubscribe extends Action {
  readonly type: LandingActionTypes.EMAIL_SUBSCRIBE;
  payload: EmailSubscribePayload;
}

export interface EmailSubscribeSuccessPayload {
  result: 'success' | 'error';
  msg: string;
}
export interface EmailSubscribeSuccess extends Action {
  readonly type: LandingActionTypes.EMAIL_SUBSCRIBE_SUCCESS;
  payload: EmailSubscribeSuccessPayload;
}

export interface EmailSubscribeFailurePayload {}
export interface EmailSubscribeFailure extends Action {
  readonly type: LandingActionTypes.EMAIL_SUBSCRIBE_FAILURE;
  payload: EmailSubscribeFailurePayload;
}

export const landingActions = {
  emailSubscribe: createStandardAction(LandingActionTypes.EMAIL_SUBSCRIBE)<EmailSubscribePayload>(),
  emailSubscribeSuccess: createStandardAction(LandingActionTypes.EMAIL_SUBSCRIBE_SUCCESS)<
    EmailSubscribeSuccessPayload
  >(),
  emailSubscribeFailure: createStandardAction(LandingActionTypes.EMAIL_SUBSCRIBE_FAILURE)<
    EmailSubscribeFailurePayload
  >(),
};

export type LandingActions = EmailSubscribe | EmailSubscribeSuccess | EmailSubscribeFailure;
