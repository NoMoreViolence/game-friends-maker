import { ImmerReducer, createActionCreators, createReducerFunction, Actions } from 'immer-reducer';
import { createSelector } from 'reselect';
import { Global } from '@models';
import { InitLanguagePayload, SetLanguagePayload, ToastPayload, AlertPayload } from '@payloads';

const userLang = navigator.language || ((navigator as unknown) as { userLanguage: string }).userLanguage;
const localLang = localStorage.getItem('lang');

const lang =
  localLang !== null && (localLang.includes('ko') || localLang.includes('en'))
    ? localLang.includes('ko')
      ? 'ko'
      : 'en'
    : userLang === 'ko'
    ? 'ko'
    : 'en';
localStorage.setItem('lang', lang);

export const globalInitialState: Global = {
  globalInfo: {
    alerts: [],
    toasts: [],
    language: lang,
  },
};

export class GlobalReducer extends ImmerReducer<Global> {
  initLanguage(payload: InitLanguagePayload) {}
  setLanguage(payload: SetLanguagePayload) {
    localStorage.setItem('lang', payload.lang);
    this.draftState.globalInfo.language = payload.lang;
  }

  toast(payload: ToastPayload) {
    this.draftState.globalInfo.toasts.push(payload);
  }
  alert(payload: AlertPayload) {
    this.draftState.globalInfo.alerts.push(payload);
  }
}
export type GlobalActions = Actions<typeof GlobalReducer>;
export const globalActions = createActionCreators(GlobalReducer);
export const globalReducerFunction = createReducerFunction(GlobalReducer, globalInitialState);

export const globalSelector = (state: Global) => state;

export const getAlertsSelector = createSelector(
  [globalSelector],
  state => state.globalInfo.alerts,
);
export const getToastsSelector = createSelector(
  [globalSelector],
  state => state.globalInfo.toasts,
);
export const getLanguageSelector = createSelector(
  [globalSelector],
  state => state.globalInfo.language,
);
