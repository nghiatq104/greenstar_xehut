import {combineReducers} from 'redux';
import rootSaga from '../sagas/';
import configureStore from './createStore';
import {mainReducers} from './main';
import {sharedReducers} from './shared';
import {authReducers} from './authentication';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  main: mainReducers,
  shared: sharedReducers,
  auth: authReducers
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  let {store, sagasManager, sagaMiddleware} = configureStore(
    finalReducers,
    rootSaga,
  );

  if (module.hot) {
    module.hot.accept(() => {
      const newYieldedSagas = require('../sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
