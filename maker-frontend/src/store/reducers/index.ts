import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History, createBrowserHistory } from 'history';
import { AppState } from '@models';
import { userReducer, userInitialState } from './user.reducer';
import { postInitialState, postReducer } from './post.reducer';

export const history = createBrowserHistory();
export const preLoadedState: AppState = {
  post: postInitialState,
  user: userInitialState,
  router: history,
};

export const rootReducer = (h: History) =>
  combineReducers({ user: userReducer, post: postReducer, router: connectRouter(h) });
