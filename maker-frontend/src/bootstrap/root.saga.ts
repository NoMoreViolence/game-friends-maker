import { all } from 'redux-saga/effects';
import LandingSaga from '@containers/landing/saga';

function* rootSaga() {
  yield all([LandingSaga()]);
}

export { rootSaga };
