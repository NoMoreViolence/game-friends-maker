import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects';
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
  Logout,
  LoginSuccess,
  RegisterSuccess,
} from '@actions';
import { getErrorResponse } from '@utils';
import { HttpStatus } from '@models';
import { registerRequest, loginRequest, getMyInfoRequest, emailSubscribeRequest } from './landing.request';
import { push } from 'connected-react-router';
import { error401Toast, error500Toast, error400Toast } from '@src/lib/common.error.toast';

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
      const { status } = getErrorResponse(e);

      if (status === HttpStatus.CONFLICT) {
        yield all([put(userActions.registerFailure()), put(userActions.login(action.payload))]);
      } else {
        yield all([put(userActions.registerFailure()), put(error400Toast())]);
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
      const { status } = getErrorResponse(e);

      if (status === HttpStatus.BAD_REQUEST || status === HttpStatus.UNAUTHORIZED) {
        return yield all([put(userActions.loginFailure()), put(error400Toast())]);
      }

      yield all([put(userActions.loginFailure()), put(error500Toast())]);
    }
  }
}

function* afterLoginAndRegister(action: LoginSuccess | RegisterSuccess) {
  if (action.type) {
    yield all([put(userActions.getMyInfo(action.payload))]);
  }
}

function* getMyInfo(action: GetMyInfo) {
  if (action.type) {
    try {
      const { value }: GetMyInfoSuccessPayload = yield call(getMyInfoRequest, action.payload);

      yield all([put(userActions.getMyInfoSuccess({ value }))]);
    } catch (e) {
      const { status } = getErrorResponse(e);

      if (status === HttpStatus.UNAUTHORIZED) {
        return yield all([put(userActions.getMyInfoFailure()), put(userActions.logout()), put(error401Toast())]);
      }

      yield all([put(userActions.getMyInfoFailure()), put(error500Toast())]);
    }
  }
}

function* logout(action: Logout) {
  if (action.type) {
    yield all([put(push('/'))]);
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
  yield takeEvery(UserActionTypes.LOGOUT, logout);
  yield takeLatest([UserActionTypes.LOGIN_SUCCESS, UserActionTypes.REGISTER_SUCCESS], afterLoginAndRegister);
  yield takeEvery(LandingActionTypes.EMAIL_SUBSCRIBE, emailSubscribe);
}
