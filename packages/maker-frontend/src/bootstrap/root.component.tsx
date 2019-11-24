import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloMainClient } from 'bootstrap';
import AppComponent from 'containers/App';

const Root = () => (
  <ApolloProvider client={ApolloMainClient}>
    <AppComponent />
  </ApolloProvider>
);

export default Root;
