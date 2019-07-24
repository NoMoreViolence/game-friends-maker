import { Action } from 'redux';
import { createStandardAction } from 'typesafe-actions';
import { GlobalActionTypes } from './global.type';
import { Lang } from '@models';
import { ToastInfo, AlertInfo } from '@src/store/models/global';

export interface SetLanguagePayload {
  lang: Lang;
}
export interface SetLanguage extends Action {
  readonly type: GlobalActionTypes.SET_LANGUAGE;
  payload: SetLanguagePayload;
}

export interface InitLanguagePayload extends SetLanguagePayload {}
export interface InitLanguage extends Action {
  readonly type: GlobalActionTypes.INIT_LANGUAGE;
}

export type AlertPayload = AlertInfo;
export interface Alert extends Action {
  readonly type: GlobalActionTypes.ALERT;
  payload: AlertPayload;
}

export interface ToastPayload extends ToastInfo {}
export interface Toast extends Action {
  readonly type: GlobalActionTypes.TOAST;
  payload: ToastPayload;
}

export const globalActions = {
  initLanguage: createStandardAction(GlobalActionTypes.INIT_LANGUAGE)<InitLanguagePayload>(),
  setLanguage: createStandardAction(GlobalActionTypes.SET_LANGUAGE)<SetLanguagePayload>(),
  alert: createStandardAction(GlobalActionTypes.ALERT)<AlertPayload>(),
  toast: createStandardAction(GlobalActionTypes.TOAST)<ToastPayload>(),
};

export type GlobalActions = InitLanguage | SetLanguage | Alert | Toast;
