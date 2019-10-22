/* eslint-disable */
import { applyMiddleware, compose, createStore, Reducer, AnyAction, Store } from 'redux';
import { createBrowserHistory } from 'history';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router';
import { preLoadedState, AppState } from './root.state';
import { rootReducer } from './root.reducer';
import { rootEpic } from './root.epic';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(epicMiddleware), applyMiddleware(routerMiddleware(history)));

export const metaReducer = (state: AppState, action: { type: string }): AppState => {
  if (action.type === 'IMMER_REDUCER:UserReducer#reset') {
    localStorage.clear();
    state = preLoadedState;
  } else if (action.type === 'IMMER_REDUCER:UserReducer#logout') {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    state = preLoadedState;
  }
  return rootReducer(history)(state, action);
};

export const configureStore = (): Store<AppState> => {
  const store = createStore(metaReducer as Reducer<AppState, AnyAction>, preLoadedState, enhancer);
  epicMiddleware.run(rootEpic);
  return store;
};
