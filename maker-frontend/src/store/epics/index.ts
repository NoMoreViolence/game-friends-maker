import { combineEpics } from 'redux-observable';
import { loginEpic } from './sign';

const rootEpic = combineEpics(loginEpic);

export { rootEpic };
