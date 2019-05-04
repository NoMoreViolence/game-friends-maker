import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/main/main.page';

const App: FC = () => (
  <>
    <Switch>
      <Route path="/" component={MainPage} />
    </Switch>
  </>
);

export default App;
