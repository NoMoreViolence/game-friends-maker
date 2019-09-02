import { produce } from 'immer';
import { createSelector } from 'reselect';
import { User, Status } from '@models';
import { UserActions } from '@actions';

export const userInitialState: User = {
  userInfo: {
    email: '',
    name: 'NodeMasterLee',
    token: '',
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
    console.log(action);
    switch (action.type) {
      case 'REGISTER':
        draft.userLoaderStatus.registerStatus = 'pending';
        break;
      case 'REGISTER_SUCCESS':
        draft.userLoaderStatus.registerStatus = 'success';
        draft.userLoaderStatus.loginStatus = 'success';
        draft.userInfo.token = action.payload.token;
        break;
      case 'REGISTER_FAILURE':
        draft.userLoaderStatus.registerStatus = 'failure';
        break;

      case 'LOGIN':
        draft.userLoaderStatus.loginStatus = 'pending';
        break;
      case 'LOGIN_SUCCESS':
        draft.userLoaderStatus.loginStatus = 'success';
        draft.userInfo.token = action.payload.token;
        break;
      case 'LOGIN_FAILURE':
        draft.userLoaderStatus.loginStatus = 'failure';
        break;

      case 'GET_MY_INFO':
        draft.userLoaderStatus.getMyInfoStatus = 'pending';
        draft.userInfo.token = action.payload.token;
        break;
      case 'GET_MY_INFO_SUCCESS':
        draft.userLoaderStatus.getMyInfoStatus = 'success';
        draft.userInfo.name = action.payload.user.name;
        draft.userInfo.email = action.payload.user.email;
        break;
      case 'GET_MY_INFO_FAILURE':
        draft.userLoaderStatus.getMyInfoStatus = 'failure';
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
    Object.values(userPendings).filter(state => state === 'pending').length !== 0,
);
