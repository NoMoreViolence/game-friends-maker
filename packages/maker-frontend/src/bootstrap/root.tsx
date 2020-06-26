import { ApolloProvider } from '@apollo/react-hooks';
import { Landing } from 'pages/Landing';
import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ResetCss, theme } from 'ui/System';
import { ApolloMainClient } from './apollo';

const App = lazy(() => import('pages/App'));

export const Root: FC = () => (
  <ApolloProvider client={ApolloMainClient}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ResetCss />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/app" component={App} />
            <Route path="/" component={Landing} />
            <Redirect from="/*" to="/" />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
);
