import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/main/main.page';
import LoadingContainer from './containers/loading/loading.container';

const App: FC = () => (
  <>
    <LoadingContainer />
    <Switch>
      <Route path="/" component={MainPage} />
    </Switch>
  </>
);

export default App;
