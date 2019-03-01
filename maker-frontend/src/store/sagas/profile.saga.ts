import { Action } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  GET_MY_PROFILE,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAILURE,
  CHANGE_PROFILE,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAILURE,
  CHANGE_USERNAME
} from 'store/actions';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const getMyProfile = (token: string) =>
  axios
    .get('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(
      (
        res: AxiosResponse<{
          success: boolean;
          message: string;
          value: {
            username: string;
            introduce: string;
            pictureUrl: string;
            visibility: boolean;
          };
        }>
      ) => res.data.value
    );
function* getMyProfileSaga(action: Action<GET_MY_PROFILE>) {
  if (action.payload) {
    try {
      const response = yield call(getMyProfile, action.payload);
      console.log(response);
      yield put({ type: GET_MY_PROFILE_SUCCESS, payload: response });
    } catch (e) {
      yield put({ type: GET_MY_PROFILE_FAILURE, payload: e.response.data });
    }
  }
}

const changeMyProfile = (changes: { token: string; username: string; introduce: string }) =>
  axios
    .patch(
      '/api/user/profile',
      { username: changes.username, introduce: changes.introduce },
      {
        headers: { Authorization: `Bearer ${changes.token}` }
      }
    )
    .then(res => ({ res }))
    .catch(err => ({ err }));
function* changeMyProfileSaga(action: Action<CHANGE_PROFILE>) {
  if (action.payload) {
    const { res, err } = yield call(changeMyProfile, action.payload);
    if (res) {
      yield put({ type: CHANGE_PROFILE_SUCCESS, payload: action.payload });
    } else {
      yield put({ type: CHANGE_PROFILE_FAILURE, payload: err });
    }
  }
}
function* changeMyProfileSuccessSaga(action: Action<CHANGE_PROFILE_SUCCESS>) {
  if (action.payload) {
    localStorage.setItem('name', action.payload.username);
    yield put({ type: GET_MY_PROFILE, payload: action.payload.token });
    yield put({ type: CHANGE_USERNAME, payload: action.payload.username });
  }
}

function* profileSaga() {
  yield takeEvery(GET_MY_PROFILE, getMyProfileSaga);
  yield takeEvery(CHANGE_PROFILE, changeMyProfileSaga);
  yield takeEvery(CHANGE_PROFILE_SUCCESS, changeMyProfileSuccessSaga);
}

export { profileSaga };
