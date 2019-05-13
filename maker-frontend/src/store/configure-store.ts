import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, Reducer, AnyAction } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router';
import { AppState } from '@models';
import { rootReducer } from './reducers';
import { rootEpic } from './epics';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const composeEnhancers =
  typeof window === 'object' && ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as any)
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(epicMiddleware), applyMiddleware(routerMiddleware(history)));

export const metaReducer = (state: AppState, action: { type: string }) => {
  if (action.type === 'RESET') {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    state = (null as unknown) as AppState;
  }
  return rootReducer(history)(state, action);
};

export const configureStore = () => {
  const store = createStore(metaReducer as Reducer<AppState, AnyAction>, enhancer);
  epicMiddleware.run(rootEpic);
  return store;
};
