import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose, Reducer, AnyAction } from 'redux';
import { rootEpic } from './epics';
import { metaReducer } from './reducers';
import { AppState } from '@models';

const epicMiddleware = createEpicMiddleware();
const composeEnhancers =
  typeof window === 'object' && ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as any)
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(epicMiddleware));

export default () => {
  const store = createStore(metaReducer as Reducer<AppState, AnyAction>, enhancer);
  epicMiddleware.run(rootEpic);
  return store;
};
