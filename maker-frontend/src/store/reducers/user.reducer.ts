import { produce } from 'immer';
import { createSelector } from 'reselect';
import { User, Status } from '../models';
import { SignActions } from '../actions';

const initialState: User = {
  email: '',
  token: '',
  expiresIn: 0,
  loginStatus: 'initial'
};

export const userReducer = (state: User = initialState, action: SignActions) =>
  produce(state, (draft: User) => {
    switch (action.type) {
      case 'LOGIN':
        draft.loginStatus = 'pending';
        break;
      case 'LOGIN_SUCCESS':
        draft.loginStatus = 'success';
        break;
      case 'LOGIN_FAILURE':
        draft.loginStatus = 'failure';
        break;

      default:
        break;
    }
  });

export const getStatusSelector = (state: User) => ({ loginStatus: state.loginStatus });

export const isUserPending = createSelector(
  [getStatusSelector],
  (userPendings: { [key: string]: Status }) =>
    !(Object.values(userPendings).filter(state => state === 'pending').length === 0)
);
