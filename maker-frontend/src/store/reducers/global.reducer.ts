import { produce } from 'immer';
import { createSelector } from 'reselect';
import { Global } from '@models';
import { GlobalActions } from '@actions';

export const globalInitialState: Global = {
  globalInfo: {
    alerts: [],
    language: 'en',
  },
};

export const globalReducer = (state: Global = globalInitialState, action: GlobalActions): Global =>
  produce(state, (draft: Global) => {
    switch (action.type) {
      case 'INIT_LANGUAGE':
        break;
      case 'SET_LANGUAGE':
        break;
      case 'TOAST':
        break;
      case 'ALERT':
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
export const getLanguageSelector = createSelector(
  [globalSelector],
  state => state.globalInfo.language,
);
