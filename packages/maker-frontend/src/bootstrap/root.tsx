import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloMainClient } from 'bootstrap';
import { App } from 'containers/App';

export const Root = () => (
  <ApolloProvider client={ApolloMainClient}>
    <App />
  </ApolloProvider>
);
