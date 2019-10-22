import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { userReducerFunction, globalReducerFunction, landingReducerFunction } from '@reducers';

export const rootReducer = (h: History) =>
  combineReducers({
    user: userReducerFunction,
    global: globalReducerFunction,
    landing: landingReducerFunction,
    router: connectRouter(h),
  });
