import React, { FC } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/main/main.page';

const App: FC = () => (
  <>
    <Switch>
      <Route path="/" component={MainPage} />
    </Switch>
  </>
);

export default hot(module)(App);
