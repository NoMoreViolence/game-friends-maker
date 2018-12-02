import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailRegex, passwordRegex } from 'lib';

import './login.component.scss';

interface Props {
  loginSuccess: boolean;
  loginPending: boolean;
  login: (
    value: { email: string; password: string }
  ) => Promise<{
    action: any;
    value: {
      data: {
        value: {
          admin: boolean;
          email: string;
          username: string;
          token: string;
        };
      };
    };
  }>;
}

interface State {
  email: string;
  password: string;
}

class LoginComponent extends React.Component<Props & RouteComponentProps<any>, State> {
  state = {
    email: '',
    password: ''
  };

  componentDidMount = () => {};

  componentWillUnmount = () => {};

  public onChange = (value: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      [(value.target.name as 'email') || (value.target.name as 'password')]: value.target.value
    });

  public login = () => {
    const { email, password } = this.state;

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      toast.error('Invaild email value');
    } else {
      this.props
        .login({ email, password })
        .then(res => (toast.success(`Hello ${res.value.data.value.username}`), this.props.history.push('/main')))
        .catch((err: { response: { data: { message: string } } }) => toast.error(err.response.data.message));
    }
  };

  render = () => {
    return (
      <>
        <div id="inputs">
          <input name="email" type="text" placeholder="이메일" onChange={this.onChange} />
          <input name="password" type="password" placeholder="비밀번호" onChange={this.onChange} />
        </div>
        <div id="buttons">
          <button id="primary" onClick={this.login}>
            로그인
          </button>
        </div>
      </>
    );
  };
}

export default LoginComponent;
