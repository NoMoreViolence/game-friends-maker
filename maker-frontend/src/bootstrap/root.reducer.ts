import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { userReducer, globalReducer, landingReducer } from '@reducers';

export const rootReducer = (h: History) =>
  combineReducers({
    global: globalReducer,
    user: userReducer,
    landing: landingReducer,
    router: connectRouter(h),
  });
