import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { configureStore, history } from './store';
import AppComponent from './App';
import { ConnectedRouter } from 'connected-react-router';

const store = configureStore();

const Root: FC<{}> = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppComponent />
    </ConnectedRouter>
  </Provider>
);

export default Root;
