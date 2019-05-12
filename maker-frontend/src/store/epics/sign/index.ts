import { combineEpics } from 'redux-observable';
import { registerEpic$, loginEpic$ } from './sign.epic';

export const signEpic = combineEpics(registerEpic$, loginEpic$);
