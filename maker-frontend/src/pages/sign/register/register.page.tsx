import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './register.page.scss';

import LoginContainer from 'containers/login/login.container';

class RegisterPage extends React.PureComponent<{}, {}> {
  render = () => (
    <>
      <div id="register-logo">
        <span>회원가입</span>
      </div>
      <div id="register-form">
        <LoginContainer />
      </div>
      <div id="register-comment">
        <span>
          <NavLink id="link" to="/sign/login">
            계정이 이미 있나요 ?
          </NavLink>
        </span>
      </div>
    </>
  );
}

export default RegisterPage;
