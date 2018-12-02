import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './login.page.scss';

import LoginContainer from 'containers/login/login.container';

class LoginPage extends React.PureComponent<{}, {}> {
  public render = () => (
    <>
      <div id="logo">
        <span>로그인</span>
      </div>
      <div id="form">
        <LoginContainer />
      </div>
      <div id="comment">
        <span>
          <NavLink id="link" to="/sign/forgot">
            비밀번호를 잃어 버리셨나요 ?
          </NavLink>
        </span>
        <span>
          <NavLink id="link" to="/sign/register">
            아직 계정이 없나요 ?
          </NavLink>
        </span>
      </div>
    </>
  );
}

export default LoginPage;
