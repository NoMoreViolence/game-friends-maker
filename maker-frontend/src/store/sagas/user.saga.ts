import { Action } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, AUTO_LOGIN, AUTO_LOGIN_SUCCESS, AUTO_LOGIN_FAILURE } from 'store/actions';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const loginApi = (value: { email: string; password: string }) =>
  axios.post('/api/auth/login', { email: value.email, password: value.password }).then(
    (
      res: AxiosResponse<{
        success: boolean;
        message: string;
        value: {
          admin: boolean;
          username: string;
          email: string;
          token: string;
        };
      }>
    ) => res.data.value
  );
function* loginSaga(action: Action<LOGIN>) {
  if (action.payload) {
    try {
      const response = yield call(loginApi, action.payload);
      yield put({ type: LOGIN_SUCCESS, payload: response });
    } catch (e) {
      yield put({ type: LOGIN_FAILURE, payload: e.response.data });
    }
  }
}
const loginSuccessSaga = (action: Action<LOGIN_SUCCESS>) =>
  action.payload
    ? (toast.success(`안녕하세요 ${action.payload.username}님 !`),
      localStorage.setItem('token', action.payload.token),
      localStorage.setItem('name', action.payload.username))
    : toast.error('알 수 없는 에러 !');
const loginFailureSaga = (action: Action<LOGIN_FAILURE>) =>
  action.payload ? toast.error(`에러: ${action.payload.message}`) : toast.error(`에러 !`);

const autoLoginApi = (value: { token: string }) =>
  axios.post('/api/auth/check', {}, { headers: { Authorization: `Bearer ${value.token}` } }).then(
    (
      res: AxiosResponse<{
        success: boolean;
        message: string;
        value: {
          admin: boolean;
          username: string;
          email: string;
        };
      }>
    ) => res.data.value
  );
function* autoLoginSaga(action: Action<AUTO_LOGIN>) {
  if (action.payload) {
    try {
      const response = yield call(autoLoginApi, action.payload);
      yield put({ type: AUTO_LOGIN_SUCCESS, payload: response });
    } catch (e) {
      yield put({ type: AUTO_LOGIN_FAILURE, payload: e.response.data });
    }
  }
}
const autoLoginSuccessSaga = (action: Action<AUTO_LOGIN_SUCCESS>) =>
  action.payload
    ? (toast.success(`안녕하세요 ${action.payload.username}님 !`), localStorage.setItem('name', action.payload.username))
    : toast.error('알 수 없는 에러 !');
const autoLoginFailureSaga = (action: Action<AUTO_LOGIN_FAILURE>) =>
  action.payload ? toast.error(`에러: ${action.payload.message}`) : toast.error(`에러 !`);

const logoutSaga = (action: Action<LOGOUT>) => {
  localStorage.removeItem('token');
  toast('로그아웃 성공, 안녕히 가세요');
};

function* userSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(LOGIN_SUCCESS, loginSuccessSaga);
  yield takeEvery(LOGIN_FAILURE, loginFailureSaga);

  yield takeEvery(AUTO_LOGIN, autoLoginSaga);
  yield takeEvery(AUTO_LOGIN_SUCCESS, autoLoginSuccessSaga);
  yield takeEvery(AUTO_LOGIN_FAILURE, autoLoginFailureSaga);

  yield takeEvery(LOGOUT, logoutSaga);
}

export { userSaga };
