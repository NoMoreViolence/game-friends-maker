import { ApolloProvider } from '@apollo/react-hooks';
import { Page } from 'pages/Page';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ResetCss, theme } from 'ui/System';
import { apolloClient } from './apollo';

export const Root: FC = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ResetCss />
        <Page />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
);
