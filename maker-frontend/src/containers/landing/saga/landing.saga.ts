import { put, call, all, takeEvery } from 'redux-saga/effects';
import {
  userActions,
  Register,
  RegisterSuccessPayload,
  UserActionTypes,
  globalActions,
  Login,
  LoginSuccessPayload,
  GetMyInfoSuccessPayload,
  GetMyInfo,
  EmailSubscribe,
  EmailSubscribeSuccessPayload,
  landingActions,
  LandingActionTypes,
} from '@actions';
import { getErrorResponse } from '@utils';
import { HttpStatus } from '@models';
import { registerRequest, loginRequest, getMyInfoRequest, emailSubscribeRequest } from './landing.request';

function* register(action: Register) {
  if (action.type) {
    try {
      const registerResponse: RegisterSuccessPayload = yield call(registerRequest, action.payload);

      localStorage.setItem('token', registerResponse.token);
      yield all([
        put(userActions.registerSuccess(registerResponse)),
        put(
          globalActions.toast({
            type: 'success',
            title: 'register.success.title',
            text: [{ id: 'register.success.text' }, { name: action.payload.name }],
          }),
        ),
      ]);
    } catch (e) {
      const { error } = getErrorResponse(e);

      if (error.status === HttpStatus.CONFLICT) {
        yield all([put(userActions.registerFailure()), put(userActions.login(action.payload))]);
      } else {
        yield all([put(userActions.registerFailure())]);
      }
    }
  }
}

function* login(action: Login) {
  if (action.type) {
    try {
      const loginResponse: LoginSuccessPayload = yield call(loginRequest, action.payload);

      localStorage.setItem('token', loginResponse.token);
      yield all([
        put(userActions.loginSuccess(loginResponse)),
        put(
          globalActions.toast({
            type: 'success',
            title: [{ id: 'login.success.title' }, { name: action.payload.name }],
            text: 'login.success.text',
          }),
        ),
      ]);
    } catch (e) {
      // const { error } = getErrorResponse(e);

      yield all([put(userActions.loginFailure())]);
    }
  }
}

function* getMyInfo(action: GetMyInfo) {
  if (action.type) {
    try {
      const getMyInfoResponse: GetMyInfoSuccessPayload = yield call(getMyInfoRequest, action.payload);

      yield all([put(userActions.getMyInfoSuccess(getMyInfoResponse))]);
    } catch (e) {
      // const { error } = getErrorResponse(e);

      yield all([put(userActions.getMyInfoFailure())]);
      // if (error.status === HttpStatus.UNAUTHORIZED) {
      //   yield all([put(userActions.getMyInfoFailure())]);
      // } else {
      //   yield all([put(userActions.getMyInfoFailure())]);
      // }
    }
  }
}

function* emailSubscribe(action: EmailSubscribe) {
  if (action.type) {
    try {
      const emailSubscribeResponse: EmailSubscribeSuccessPayload = yield call(emailSubscribeRequest, action.payload);

      if (emailSubscribeResponse.result === 'success') {
        yield all([
          put(landingActions.emailSubscribeSuccess(emailSubscribeResponse)),
          put(
            globalActions.alert({
              type: 'success',
              title: 'toast.success.email.title',
              text: 'toast.success.email.text',
              showConfirmButton: false,
              reject: () => {},
              resolve: () => {},
            }),
          ),
        ]);
      } else {
        yield all([
          put(landingActions.emailSubscribeFailure({})),
          put(
            globalActions.alert({
              type: 'error',
              title: 'toast.error.email.already.title',
              text: 'toast.error.email.already.text',
              showConfirmButton: false,
              reject: () => {},
              resolve: () => {},
            }),
          ),
        ]);
      }
    } catch (e) {
      yield all([
        put(landingActions.emailSubscribeFailure({})),
        put(
          globalActions.alert({
            type: 'error',
            title: 'toast.error.email.already.title',
            text: 'toast.error.email.already.text',
            showConfirmButton: false,
            reject: () => {},
            resolve: () => {},
          }),
        ),
      ]);
    }
  }
}

export default function* landing() {
  yield takeEvery(UserActionTypes.REGISTER, register);
  yield takeEvery(UserActionTypes.LOGIN, login);
  yield takeEvery(UserActionTypes.GET_MY_INFO, getMyInfo);
  yield takeEvery(LandingActionTypes.EMAIL_SUBSCRIBE, emailSubscribe);
}
