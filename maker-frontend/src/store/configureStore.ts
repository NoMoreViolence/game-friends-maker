import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { reducer } from './reducers';

import ReduxThunk from 'redux-thunk';
const promiseMiddlewareV = promiseMiddleware({
  promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
});

const composeEnhancers =
  typeof window === 'object' && ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as any)
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk, promiseMiddlewareV));
const configureStore = createStore(reducer, enhancer);

export { configureStore };
