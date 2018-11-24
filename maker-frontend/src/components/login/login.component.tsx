import * as React from 'react';
import { AxiosPromise } from 'axios';
import './login.component.scss';

interface Props {
  loginSuccess: boolean;
  loginPending: boolean;
  signIn: (value: { email: string; password: string }) => AxiosPromise<Object>;
}

class Login extends React.Component<Props, {}> {
  public componentDidMount() {
    this.props
      .signIn({ email: '', password: '' })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public render() {
    return (
      <div id="main">
        <div>awejofijw;aeofij</div>
      </div>
    );
  }
}

export default Login;
