import React, { FC } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { UserStateContextProvider } from 'context';
import LandingComponent from 'containers/landing';
import { ScreenComponent } from './screen';

const App: FC = () => (
  <BrowserRouter>
    <UserStateContextProvider>
      <Switch>
        <Route path="/app" component={ScreenComponent} />
        <Route path="/" exact={true} component={LandingComponent} />
        <Redirect to="/" />
      </Switch>
    </UserStateContextProvider>
  </BrowserRouter>
);

export default App;
