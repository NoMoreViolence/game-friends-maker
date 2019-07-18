import { produce } from 'immer';
import { createSelector } from 'reselect';
import { User, Status } from '@models';
import { UserActions } from '@actions';

export const userInitialState: User = {
  userInfo: {
    email: '',
    name: 'NodeMasterLee',
    token: '',
    expiresIn: 0,
  },
  userLoaderStatus: {
    loginStatus: 'initial',
    registerStatus: 'initial',
    getMyInfoStatus: 'initial',
  },
  userStatus: {},
};

export const userReducer = (state: User = userInitialState, action: UserActions): User =>
  produce(state, (draft: User) => {
    switch (action.type) {
      case 'REGISTER':
        draft.userLoaderStatus.registerStatus = 'pending';
        break;
      case 'REGISTER_SUCCESS':
        draft.userLoaderStatus.registerStatus = 'success';
        draft.userInfo.expiresIn = action.payload.expiresIn;
        draft.userInfo.token = action.payload.token;
        break;
      case 'REGISTER_FAILURE':
        draft.userLoaderStatus.registerStatus = 'failure';
        break;

      default:
        break;
    }
  });

export const getUserStatusSelector = (state: User) => ({
  ...state.userLoaderStatus,
});

export const isUserPending = createSelector(
  [getUserStatusSelector],
  (userPendings: { [key: string]: Status }) =>
    !(Object.values(userPendings).filter(state => state === 'pending').length === 0),
);
