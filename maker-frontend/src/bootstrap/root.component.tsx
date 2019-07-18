import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import {} from 'react-intl';
import { configureStore, history } from '@bootstrap';
import AppComponent from '@containers/App';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppComponent />
    </ConnectedRouter>
  </Provider>
);

export default Root;
