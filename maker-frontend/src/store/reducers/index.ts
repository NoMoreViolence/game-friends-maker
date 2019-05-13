import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { userReducer } from './user.reducer';
import { History } from 'history';

export const rootReducer = (history: History<any>) =>
  combineReducers({ user: userReducer, router: connectRouter(history) });
