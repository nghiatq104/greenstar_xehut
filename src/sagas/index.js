import {all, fork} from 'redux-saga/effects';
/* ------------- Sagas ------------- */
import * as mainSagas from './MainSagas';
import * as authSagas from './AuthSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([...Object.values(authSagas)].map(fork));
  yield all([...Object.values(mainSagas)].map(fork));
}
