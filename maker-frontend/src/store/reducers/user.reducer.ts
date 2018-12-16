import { handleActions, Action } from 'redux-actions';
import { produce } from 'immer';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  AUTO_LOGIN,
  AUTO_LOGIN_SUCCESS,
  AUTO_LOGIN_FAILURE,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './../actions';
import { User } from '../models';

const initialState: User = {
  email: '',
  username: '',
  admin: false,
  loginPending: false,
  loginSuccess: false,
  registerPending: false,
  registerSuccess: false
};

const userReducer = handleActions<User, any>(
  {
    [LOGIN]: (state, action: Action<LOGIN>) =>
      produce(state, draft => {
        draft.loginPending = true;
        draft.loginSuccess = false;
      }),
    [LOGIN_SUCCESS]: (state, action: Action<LOGIN_SUCCESS>) =>
      produce(state, draft => {
        if (action.payload) {
          draft.loginPending = false;
          draft.loginSuccess = true;
          draft.email = action.payload.email;
          draft.username = action.payload.username;
          draft.admin = action.payload.admin;
        }
      }),
    [LOGIN_FAILURE]: (state, action: Action<LOGIN_FAILURE>) =>
      produce(state, draft => {
        draft.loginPending = false;
        draft.loginSuccess = false;
      }),

    [AUTO_LOGIN]: (state, action: Action<AUTO_LOGIN>) =>
      produce(state, draft => {
        draft.loginPending = true;
        draft.loginSuccess = false;
      }),
    [AUTO_LOGIN_SUCCESS]: (state, action: Action<AUTO_LOGIN_SUCCESS>) =>
      produce(state, draft => {
        if (action.payload) {
          draft.loginPending = false;
          draft.loginSuccess = true;
          draft.email = action.payload.email;
          draft.username = action.payload.username;
          draft.admin = action.payload.admin;
        }
      }),
    [AUTO_LOGIN_FAILURE]: (state, action: Action<AUTO_LOGIN_FAILURE>) =>
      produce(state, draft => {
        draft.loginPending = false;
        draft.loginSuccess = false;
      }),

    [REGISTER]: (state, action: Action<REGISTER>) =>
      produce(state, draft => {
        draft.registerPending = true;
        draft.registerSuccess = false;
      }),
    [REGISTER_SUCCESS]: (state, action: Action<REGISTER_SUCCESS>) =>
      produce(state, draft => {
        draft.registerPending = false;
        draft.registerSuccess = true;
      }),
    [REGISTER_FAILURE]: (state, action: Action<REGISTER_FAILURE>) =>
      produce(state, draft => {
        draft.registerPending = false;
        draft.registerSuccess = false;
      }),

    [LOGOUT]: (state, action: Action<LOGOUT>) => produce(state, draft => initialState)
  },
  initialState
);

export { userReducer };
