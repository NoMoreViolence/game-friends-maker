import { all } from 'redux-saga/effects';
import { userSaga } from './user.saga';
import { profileSaga } from './profile.saga';

function* rootSaga() {
  yield all([profileSaga(), userSaga()]);
}

export { rootSaga };
