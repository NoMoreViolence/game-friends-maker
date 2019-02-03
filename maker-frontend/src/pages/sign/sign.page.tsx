import * as React from 'react';
import { Route } from 'react-router-dom';
import './sign.page.scss';

import LoginPage from './login/login.page';
import RegisterPage from './register/register.page';

const SignPage: React.SFC<{}> = () => (
  <div id="sign">
    <div className="white-gray-border white-background radius">
      <Route path="/sign/login" exact={true} component={LoginPage} />
      <Route path="/sign/register" exact={true} component={RegisterPage} />
    </div>
  </div>
);

export default SignPage;
