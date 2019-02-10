import { Action } from 'redux-actions';
import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_MY_PROFILE, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAILURE } from 'store/actions';
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
      yield put({ type: GET_MY_PROFILE_SUCCESS, payload: response });
    } catch (e) {
      yield put({ type: GET_MY_PROFILE_FAILURE, payload: e.response.data });
    }
  }
}

function* profileSaga() {
  yield takeEvery(GET_MY_PROFILE, getMyProfileSaga);
}

export { profileSaga };
