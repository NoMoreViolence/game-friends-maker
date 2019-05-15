import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, history } from './store';
import AppComponent from './App';

const store = configureStore();

const Root: FC<{}> = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppComponent />
    </ConnectedRouter>
  </Provider>
);

export default Root;
