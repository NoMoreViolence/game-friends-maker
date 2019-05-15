import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History, createBrowserHistory } from 'history';
import { userReducer, userInitialState } from './user.reducer';
import { AppState } from '@models';

export const history = createBrowserHistory();
export const preLoadedState: AppState = {
  user: userInitialState,
  router: history,
};

export const rootReducer = (h: History<any>) => combineReducers({ user: userReducer, router: connectRouter(h) });
