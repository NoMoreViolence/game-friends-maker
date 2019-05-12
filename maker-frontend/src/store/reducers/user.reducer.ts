import { produce } from 'immer';
import { createSelector } from 'reselect';
import { User, Status } from '../models';
import { SignActions } from '../actions';

export const userInitialState: User = {
  email: '',
  name: 'NodeMasterLee',
  token: '',
  expiresIn: 0,
  loginStatus: 'initial',
  registerStatus: 'initial',
  getMyInfoStatus: 'initial'
};

export const userReducer = (state: User = userInitialState, action: SignActions) =>
  produce(state, (draft: User) => {
    switch (action.type) {
      case 'REGISTER':
        draft.registerStatus = 'pending';
        break;
      case 'REGISTER_SUCCESS':
        draft.registerStatus = 'success';
        draft.expiresIn = action.payload.expiresIn;
        draft.token = action.payload.token;
        break;
      case 'REGISTER_FAILURE':
        draft.registerStatus = 'failure';
        break;

      case 'LOGIN':
        draft.loginStatus = 'pending';
        break;
      case 'LOGIN_SUCCESS':
        draft.loginStatus = 'success';
        draft.expiresIn = action.payload.expiresIn;
        draft.token = action.payload.token;
        break;
      case 'LOGIN_FAILURE':
        draft.loginStatus = 'failure';
        break;

      case 'GET_MY_INFO':
        draft.getMyInfoStatus = 'pending';
        break;
      case 'GET_MY_INFO_SUCCESS':
        draft.getMyInfoStatus = 'success';
        draft.email = action.payload.email;
        draft.name = action.payload.name;
        break;
      case 'GET_MY_INFO_FAILURE':
        draft.getMyInfoStatus = 'failure';
        break;

      default:
        break;
    }
  });

export const getStatusSelector = (state: User) => ({
  loginStatus: state.loginStatus,
  registerStatus: state.registerStatus,
  getMyInfoStatus: state.getMyInfoStatus
});

export const isUserPending = createSelector(
  [getStatusSelector],
  (userPendings: { [key: string]: Status }) =>
    !(Object.values(userPendings).filter(state => state === 'pending').length === 0)
);
