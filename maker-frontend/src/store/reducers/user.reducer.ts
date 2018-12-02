import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { Action } from 'lib';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './../actions';
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
    [LOGIN_PENDING]: (state, action: Action<LOGIN_PENDING>) =>
      produce(state, draft => {
        draft.loginPending = true;
        draft.loginSuccess = false;
      }),
    [LOGIN_SUCCESS]: (state, action: Action<LOGIN_SUCCESS>) =>
      produce(state, draft => {
        draft.loginPending = false;
        draft.loginSuccess = true;
        draft.email = action.payload.data.value.email;
        draft.username = action.payload.data.value.username;
        draft.admin = action.payload.data.value.admin;
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
