import React, { FC } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Landing } from 'route/home';
import { Screen } from 'route/screen';

export const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/app" component={Screen} />
      <Route path="/" exact={true} component={Landing} />
      <Redirect path="/*" to="/" />
    </Switch>
  </BrowserRouter>
);
