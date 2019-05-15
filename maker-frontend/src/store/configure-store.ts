import { createBrowserHistory } from 'history';
import {
  applyMiddleware,
  compose,
  createStore,
  Reducer,
  AnyAction,
  Store,
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { AppState, User } from '@models';
import { rootReducer, preLoadedState } from './reducers';
import { rootEpic } from './epics';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const composeEnhancers = typeof window === 'object' && ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as any)
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const enhancer = composeEnhancers(applyMiddleware(epicMiddleware), applyMiddleware(routerMiddleware(history)));

export const metaReducer = (
  state: AppState,
  action: { type: string },
): {
  user: User;
  router: RouterState;
} => {
  if (action.type === 'RESET') {
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
