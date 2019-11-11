import { ImmerReducer, createActionCreators, createReducerFunction, Actions } from 'immer-reducer';
import { createSelector } from 'reselect';
import { User, Status } from 'store/models';
import {
  RegisterPayload,
  RegisterSuccessPayload,
  LoginPayload,
  LoginSuccessPayload,
  GetMyInfoPayload,
  GetMyInfoSuccessPayload,
} from 'store/payloads';

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

export class UserReducer extends ImmerReducer<User> {
  register(payload: RegisterPayload) {
    this.draftState.userLoaderStatus.registerStatus = 'pending';
  }
  registerSuccess(payload: RegisterSuccessPayload) {
    this.draftState.userLoaderStatus.registerStatus = 'success';
    this.draftState.userLoaderStatus.loginStatus = 'success';
    this.draftState.userInfo.token = payload.token;
  }
  registerFailure() {
    this.draftState.userLoaderStatus.registerStatus = 'failure';
  }

  login(payload: LoginPayload) {
    this.draftState.userLoaderStatus.loginStatus = 'pending';
  }
  loginSuccess(payload: LoginSuccessPayload) {
    this.draftState.userLoaderStatus.loginStatus = 'success';
    this.draftState.userInfo.token = payload.token;
  }
  loginFailure() {
    this.draftState.userLoaderStatus.loginStatus = 'failure';
  }

  getMyInfo(payload: GetMyInfoPayload) {
    this.draftState.userLoaderStatus.getMyInfoStatus = 'pending';
    this.draftState.userInfo.token = payload.token;
  }
  getMyInfoSuccess(payload: GetMyInfoSuccessPayload) {
    this.draftState.userLoaderStatus.loginStatus = 'success';
    this.draftState.userLoaderStatus.getMyInfoStatus = 'success';
    this.draftState.userInfo.name = payload.value.name;
    this.draftState.userInfo.email = payload.value.email;
  }
  getMyInfoFailure() {
    this.draftState.userLoaderStatus.getMyInfoStatus = 'failure';
  }

  logout() {}
  reset() {}
}
export type UserActions = Actions<typeof UserReducer>;
export const userActions = createActionCreators(UserReducer);
export const userReducerFunction = createReducerFunction(UserReducer, userInitialState);

export const getUserStatusSelector = (state: User) => ({
  ...state.userLoaderStatus,
});

export const isUserPending = createSelector(
  [getUserStatusSelector],
  (userPendings: { [key: string]: Status }) =>
    Object.values(userPendings).filter(state => state === 'pending').length !== 0,
);
