import { combineEpics } from 'redux-observable';
import { signEpic } from './sign';
import { searchPostEpic } from './search-post';

export const rootEpic = combineEpics(signEpic, searchPostEpic);
