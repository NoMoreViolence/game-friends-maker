import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import LandingComponent from 'containers/landing';
import ScreenComponent from './screen';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app" component={ScreenComponent} />
        <Route path="/" exact={true} component={LandingComponent} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
