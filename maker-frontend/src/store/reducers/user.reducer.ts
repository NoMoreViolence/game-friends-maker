import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { Action } from 'lib';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE } from './../actions';
import { User } from '../models';

const initialState: User = {
  email: '',
  name: '',
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
        console.log(action.payload);
        draft.loginPending = false;
        draft.loginSuccess = true;
        draft.email = action.payload.data.value.email;
        draft.name = action.payload.data.value.name;
        draft.admin = action.payload.data.value.admin;
        localStorage.setItem('token', action.payload.data.value.token);
      }),
    [LOGIN_FAILURE]: (state, action: Action<LOGIN_FAILURE>) =>
      produce(state, draft => {
        draft.loginPending = false;
        draft.loginSuccess = false;
      })
  },
  initialState
);

export { userReducer };
