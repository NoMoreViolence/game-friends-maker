import axios, { AxiosError, AxiosResponse } from 'axios';
import { Action } from 'redux-actions';
import { put, call } from 'redux-saga/effects';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from 'store/actions';

const loginApi = (value: { email: string; password: string }) =>
  axios
    .post('/api/auth/login', { email: value.email, password: value.password })
    .then(
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
    )
    .catch((err: AxiosError) => err.message);

function* loginSaga(action: Action<LOGIN>) {
  if (action.payload) {
    try {
      const response = yield call(loginApi, action.payload);
      yield put({ type: LOGIN_SUCCESS, payload: response });
    } catch (e) {
      yield put({ type: LOGIN_FAILURE, payload: e });
    }
  }
}

export { loginApi };
