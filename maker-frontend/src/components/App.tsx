import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HeaderPage from 'pages/header/header.page';
import signPage from 'pages/sign/sign.page';
import AutoLoginContainer from 'containers/auto-login/auto-login.container';
import Loader from 'pages/loader/loader.page';

import 'components/App.scss';
import 'react-toastify/dist/ReactToastify.min.css';

const AppComponent: React.SFC<{}> = () => {
  return (
    <div id="app" lang="ko">
      <ToastContainer newestOnTop={true} />
      <HeaderPage />
      <Switch>
        <Route path="/sign" component={signPage} />
      </Switch>
      <AutoLoginContainer />
      <Loader />
    </div>
  );
};

export default AppComponent;
