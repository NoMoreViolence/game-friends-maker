import React, { FC } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import LandingComponent from 'route/landing';
import { Screen } from './screen/screen';

export const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/app" component={Screen} />
      <Route path="/" exact={true} component={LandingComponent} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);
