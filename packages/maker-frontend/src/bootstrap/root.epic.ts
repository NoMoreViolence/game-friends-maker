import { combineEpics } from 'redux-observable';
import { landingEpics$ } from 'store/epics';

export const rootEpic = combineEpics(landingEpics$);
