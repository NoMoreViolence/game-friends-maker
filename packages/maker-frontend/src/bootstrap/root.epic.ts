import { combineEpics } from 'redux-observable';
import { landingEpics$ } from '@epics';

export const rootEpic = combineEpics(landingEpics$);
