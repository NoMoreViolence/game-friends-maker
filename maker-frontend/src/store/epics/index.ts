import { combineEpics } from 'redux-observable';
import { startCountdownEpic } from './test.epic';

const rootEpic = combineEpics(startCountdownEpic);

export { rootEpic };
