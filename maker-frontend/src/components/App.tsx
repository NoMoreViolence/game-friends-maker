import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HeaderPage from 'pages/header/header.page';
import signPage from 'pages/sign/sign.page';

import 'components/App.scss';
import 'react-toastify/dist/ReactToastify.min.css';

const AppComponent: React.SFC<{}> = () => {
  return (
    <div id="app" lang="ko">
      <ToastContainer />
      <HeaderPage />
      <Switch>
        <Route path="/sign" component={signPage} />
      </Switch>
    </div>
  );
};

export default AppComponent;
