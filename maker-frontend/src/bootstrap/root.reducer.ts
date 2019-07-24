import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { userReducer, globalReducer } from '@reducers';

export const rootReducer = (h: History) =>
  combineReducers({
    global: globalReducer,
    user: userReducer,
    router: connectRouter(h),
  });
