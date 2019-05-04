import { combineEpics } from 'redux-observable';
import { loginEpic } from './sign.epic';

const rootEpic = combineEpics(loginEpic);

export { rootEpic };
