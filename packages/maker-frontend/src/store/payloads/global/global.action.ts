import { Lang } from 'store/models';
import { ToastInfo, AlertInfo } from 'store/models/global';

export interface SetLanguagePayload {
  lang: Lang;
}

export interface InitLanguagePayload extends SetLanguagePayload {}

export type AlertPayload = AlertInfo;

export interface ToastPayload extends ToastInfo {}
