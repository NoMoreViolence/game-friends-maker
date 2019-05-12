import { combineEpics } from 'redux-observable';
import { signEpic } from './sign';

export const rootEpic = combineEpics(signEpic);
