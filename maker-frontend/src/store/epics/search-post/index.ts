import { combineEpics } from 'redux-observable';
import { searchPost$ } from './search-post.epic';

export const searchPostEpic = combineEpics(searchPost$);
