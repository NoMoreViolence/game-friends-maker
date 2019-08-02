import { produce } from 'immer';
import { createSelector } from 'reselect';
import { Global } from '@models';
import { GlobalActions } from '@actions';

const userLang = navigator.language || ((navigator as unknown) as any).userLanguage;
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

export const globalReducer = (state: Global = globalInitialState, action: GlobalActions): Global =>
  produce(state, (draft: Global) => {
    switch (action.type) {
      case 'INIT_LANGUAGE':
        break;
      case 'SET_LANGUAGE':
        localStorage.setItem('lang', action.payload.lang);
        draft.globalInfo.language = action.payload.lang;
        break;
      case 'TOAST':
        draft.globalInfo.toasts.push(action.payload);
        break;
      case 'ALERT':
        draft.globalInfo.alerts.push(action.payload);
        break;
      default:
        break;
    }
  });

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
