import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './login.page.scss';

import LoginContainer from 'containers/login/login.container';

const LoginPage: React.SFC<{}> = () => (
  <>
    <div id="login-form-logo" className="card-logo secondary-background">
      <span className="title-font-size white-color">로그인</span>
    </div>
    <div id="login-form">
      <LoginContainer />
    </div>
    <div id="login-comment">
      <span>
        <NavLink id="link" className="link black-color middle-font-size" to="/sign/forgot">
          비밀번호를 잃어 버리셨나요 ?
        </NavLink>
      </span>
      <span>
        <NavLink id="link" className="link black-color middle-font-size" to="/sign/register">
          아직 계정이 없나요 ?
        </NavLink>
      </span>
    </div>
  </>
);

export default LoginPage;
