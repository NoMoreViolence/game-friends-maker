import { ApolloProvider } from '@apollo/react-hooks';
import { Landing } from 'pages/Landing';
import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloMainClient } from './apollo';

const App = lazy(() => import('pages/App'));

export const Root: FC = () => (
  <ApolloProvider client={ApolloMainClient}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route to="/app" component={App} />
          <Route to="/" component={Landing} />
          <Redirect from="/*" to="/" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </ApolloProvider>
);
