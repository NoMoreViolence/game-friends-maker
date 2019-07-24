/* eslint-disable */
import { applyMiddleware, compose, createStore, Reducer, AnyAction, Store, Dispatch } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { preLoadedState, AppState } from './root.state';
import { rootReducer } from './root.reducer';
import { rootSaga } from './root.saga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware), applyMiddleware(routerMiddleware(history)));

export const metaReducer = (state: AppState, action: { type: string }): AppState => {
  if (action.type === 'RESET') {
    localStorage.clear();
    state = preLoadedState;
  } else if (action.type === 'LOGOUT') {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    state = preLoadedState;
  }
  return rootReducer(history)(state, action);
};

export const configureStore = (): Store<AppState> => {
  const store = createStore(metaReducer as Reducer<AppState, AnyAction>, preLoadedState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};
