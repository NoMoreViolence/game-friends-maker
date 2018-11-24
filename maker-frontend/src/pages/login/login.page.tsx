import * as React from 'react';
import 'components/App.scss';
import LoginContainer from 'containers/login/login.container';

class Login extends React.PureComponent<{}, {}> {
  public render = () => (
    <div id="login">
      <LoginContainer />
    </div>
  );
}

export default Login;
