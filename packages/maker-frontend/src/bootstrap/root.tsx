import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { ApolloMainClient } from './apollo';

export const Root: FC = () => (
  <ApolloProvider client={ApolloMainClient}>
    <div>Reset</div>
  </ApolloProvider>
);
