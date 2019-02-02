import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HeaderPage from 'pages/header';
import signPage from 'pages/sign';
import MyinfoPage from 'pages/myinfo';
import ProfilePage from 'pages/profile';
import AutoLoginContainer from 'containers/auto-login';
import Loader from 'pages/loader';

import 'components/App.scss';
import 'react-toastify/dist/ReactToastify.min.css';

const AppComponent: React.SFC<{}> = () => (
  <div id="app" lang="ko">
    <ToastContainer newestOnTop={true} />
    <HeaderPage />
    <Switch>
      <Route path="/sign" component={signPage} />
      <Route path="/info/profile" component={ProfilePage} />
      <Route path="/info" component={MyinfoPage} />
    </Switch>
    <AutoLoginContainer />
    <Loader />
  </div>
);

export default AppComponent;
