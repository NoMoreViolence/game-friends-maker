import { ApolloProvider } from '@apollo/react-hooks';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloMainClient } from 'bootstrap';
import { App } from 'containers/App';
import React from 'react';
import { ColorsTheme } from 'ui/color';

export const Root = () => (
  <ApolloProvider client={ApolloMainClient}>
    <MuiThemeProvider theme={ColorsTheme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>
);
