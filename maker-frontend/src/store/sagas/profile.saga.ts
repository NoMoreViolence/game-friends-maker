import { Action } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  GET_MY_PROFILE,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAILURE,
  CHANGE_PROFILE,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAILURE,
  CHANGE_USERNAME,
  UPLOAD_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  UPLOAD_PROFILE_PICTURE_FAILURE,
  DELETE_PROFILE_PICTURE,
  DELETE_PROFILE_PICTURE_SUCCESS,
  DELETE_PROFILE_PICTURE_FAILURE
} from 'store/actions';
import axios from 'axios';
import { toast } from 'react-toastify';

const getMyProfile = (token: string) =>
  axios
    .get('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data.value);
function* getMyProfileSaga(action: Action<GET_MY_PROFILE>) {
  if (action.payload) {
    try {
      const response = yield call(getMyProfile, action.payload);
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
function changeMyProfileFailureSaga(action: Action<CHANGE_PROFILE_FAILURE>) {}

const uploadMyProfilePicture = (changes: { token: string; image: File }) => {
  const formData = new FormData();
  formData.append('profile-image', changes.image);

  return axios
    .post('/api/user/profile/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${changes.token}`
      }
    })
    .then(res => ({}));
};
function* uploadMyProfilePictureSaga(action: Action<UPLOAD_PROFILE_PICTURE>) {
  if (action.payload) {
    try {
      yield call(uploadMyProfilePicture, action.payload);
      yield put({ type: UPLOAD_PROFILE_PICTURE_SUCCESS });
      yield put({ type: GET_MY_PROFILE, payload: action.payload.token });
    } catch (e) {
      yield put({ type: UPLOAD_PROFILE_PICTURE_FAILURE });
    }
  }
}

const deleteMyProfilePicture = (changes: { token: string }) =>
  axios
    .delete('/api/user/profile/upload', {
      headers: { Authorization: `Bearer ${changes.token}` }
    })
    .then(res => ({}));
function* deleteMyProfilePicutreSaga(action: Action<DELETE_PROFILE_PICTURE>) {
  if (action.payload) {
    try {
      yield call(deleteMyProfilePicture, action.payload);
      yield put({ type: DELETE_PROFILE_PICTURE_SUCCESS });
      yield put({ type: GET_MY_PROFILE, payload: action.payload.token });
    } catch (e) {
      yield put({ type: DELETE_PROFILE_PICTURE_FAILURE });
    }
  }
}

function* profileSaga() {
  yield takeEvery(GET_MY_PROFILE, getMyProfileSaga);

  yield takeEvery(CHANGE_PROFILE, changeMyProfileSaga);
  yield takeEvery(CHANGE_PROFILE_SUCCESS, changeMyProfileSuccessSaga);
  yield takeEvery(CHANGE_PROFILE_FAILURE, changeMyProfileFailureSaga);

  yield takeEvery(UPLOAD_PROFILE_PICTURE, uploadMyProfilePictureSaga);
  yield takeEvery(DELETE_PROFILE_PICTURE, deleteMyProfilePicutreSaga);
}

export { profileSaga };
