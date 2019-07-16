import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { userReducer } from '@reducers';

export const rootReducer = (h: History) =>
  combineReducers({
    user: userReducer,
    router: connectRouter(h),
  });
