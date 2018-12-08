import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { Action } from 'lib';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './../actions';
import { User } from '../models';

const initialState: User = {
  email: '',
  username: '',
  admin: false,
  loginPending: false,
  loginSuccess: false
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
        draft.loginPending = false;
        draft.loginSuccess = true;
        draft.email = action.payload.email;
        draft.username = action.payload.username;
        draft.admin = action.payload.admin;
      }),
    [LOGIN_FAILURE]: (state, action: Action<LOGIN_FAILURE>) =>
      produce(state, draft => {
        draft.loginPending = false;
        draft.loginSuccess = false;
      }),
    [LOGOUT]: (state, action: Action<LOGOUT>) => produce(state, draft => initialState)
  },
  initialState
);

export { userReducer };
