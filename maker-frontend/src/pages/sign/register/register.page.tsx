import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './register.page.scss';

import RegisterContainer from 'containers/register/register.container';

class RegisterPage extends React.PureComponent<{}, {}> {
  render = () => (
    <>
      <div id="login-form-logo" className="card-logo secondary-background">
        <span className="title-font-size white-color">회원가입</span>
      </div>
      <div id="register-form">
        <RegisterContainer />
      </div>
      <div id="register-comment">
        <span>
          <NavLink id="link" className="link black-color middle-font-size" to="/sign/login">
            계정이 이미 있나요 ?
          </NavLink>
        </span>
      </div>
    </>
  );
}

export default RegisterPage;
