import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailRegex, passwordRegex } from 'lib';
import './login.component.scss';

interface Props {
  loginSuccess: boolean;
  loginPending: boolean;
  login: (value: { email: string; password: string }) => void;
}
interface State {
  email: string;
  pw: string;
}

class LoginComponent extends React.Component<Props & RouteComponentProps<any>, State> {
  state = {
    email: '',
    pw: ''
  };

  componentDidMount = () => {
    if (this.props.loginSuccess) {
      toast.info('이미 로그인 상태입니다 !');
      this.props.history.push('/main');
    }
  };
  componentDidUpdate = (prevProps: Props & RouteComponentProps<any>, prevState: State) => {
    if (prevProps !== this.props && this.props.loginSuccess) {
      this.props.history.push('/main');
    }
  };

  public keyPress = (value: React.KeyboardEvent<HTMLInputElement>) => value.keyCode === 13 && this.login();
  public onChange = (value: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      [(value.target.name as 'email') || (value.target.name as 'pw')]: value.target.value
    });
  public login = () => {
    const { email, pw } = this.state;

    if (!emailRegex.test(email) || !passwordRegex.test(pw)) {
      toast.error('Invaild (email or password) value');
    } else {
      this.props.login({ email, password: pw });
    }
  };

  render = () => (
    <>
      <div id="inputs">
        <input name="email" type="text" className="primary-input radius large-font-size" placeholder="이메일" onChange={this.onChange} />
        <input
          name="pw"
          type="password"
          className="primary-input radius large-font-size"
          placeholder="비밀번호"
          onChange={this.onChange}
          onKeyDown={this.keyPress}
        />
      </div>
      <div id="buttons">
        <button className="primary-button radius large-font-size" onClick={this.login}>
          로그인
        </button>
      </div>
    </>
  );
}

export default LoginComponent;
