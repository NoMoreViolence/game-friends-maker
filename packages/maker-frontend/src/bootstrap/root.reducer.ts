import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import {
  userReducerFunction,
  globalReducerFunction,
  landingReducerFunction,
  postReducerFunction,
} from 'store/reducers';

export const rootReducer = (h: History) =>
  combineReducers({
    user: userReducerFunction,
    global: globalReducerFunction,
    post: postReducerFunction,
    landing: landingReducerFunction,
    router: connectRouter(h),
  });
