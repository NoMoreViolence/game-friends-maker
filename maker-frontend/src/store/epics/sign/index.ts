import { combineEpics } from 'redux-observable';
import { registerEpic$, loginEpic$, getMyInfoEpic$ } from './sign.epic';

export const signEpic = combineEpics(registerEpic$, loginEpic$, getMyInfoEpic$);
