import { ApolloProvider } from '@apollo/react-hooks';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloMainClient } from 'bootstrap';
import React from 'react';
import { App } from 'route/App';
import { GlobalStyle, ResetCss } from 'ui';
import { ColorsTheme } from 'ui/styles';

export const Root = () => (
  <ApolloProvider client={ApolloMainClient}>
    <MuiThemeProvider theme={ColorsTheme}>
      <GlobalStyle />
      <ResetCss />
      <App />
    </MuiThemeProvider>
  </ApolloProvider>
);
