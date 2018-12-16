import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import './register.component.scss';
import * as lib from 'lib';

interface Props {
  registerPending: boolean;
  registerSuccess: boolean;
  loginSuccess: boolean;
  register: (value: { username: string; email: string; password: string }) => void;
}
interface State {
  email: string;
  username: string;
  password: string;
  rpassword: string;
  usernameCheck: 'none' | 'regex' | 'duplicate' | 'success';
  emailCheck: 'none' | 'regex' | 'duplicate' | 'success';
  passwordCheck: 'none' | 'regex' | 'success';
  rpasswordCheck: 'none' | 'regex' | 'notSame' | 'success';
}

class RegisterComponent extends React.Component<Props & RouteComponentProps<any>, State> {
  public state = {
    email: '',
    username: '',
    password: '',
    rpassword: '',
    usernameCheck: 'none' as 'none' | 'regex' | 'duplicate' | 'success',
    emailCheck: 'none' as 'none' | 'regex' | 'duplicate' | 'success',
    passwordCheck: 'none' as 'none' | 'regex' | 'success',
    rpasswordCheck: 'none' as 'none' | 'regex' | 'notSame' | 'success'
  };
  public emailRef: React.RefObject<HTMLInputElement> = React.createRef();
  public usernameRef: React.RefObject<HTMLInputElement> = React.createRef();
  public passwordRef: React.RefObject<HTMLInputElement> = React.createRef();
  public rpasswordRef: React.RefObject<HTMLInputElement> = React.createRef();

  componentDidMount = () => (
    this.props.loginSuccess === true && this.props.history.push('/main'),
    this.props.registerSuccess === true && this.props.history.push('sign/login')
  );
  componentDidUpdate = () => (
    this.props.loginSuccess === true && this.props.history.push('/main'),
    this.props.registerSuccess === true && this.props.history.push('sign/login')
  );

  public onChange = (value: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      [(`${value.target.name}Check` as 'emailCheck') ||
      (`${value.target.name}Check` as 'usernameCheck') ||
      (`${value.target.name}Check` as 'passwordCheck') ||
      (`${value.target.name}Check` as 'rpasswordCheck')]: 'none' as 'none',
      [(value.target.name as 'email') ||
      (value.target.name as 'username') ||
      (value.target.name as 'password') ||
      (value.target.name as 'rpassword')]: value.target.value
    });
  public keyPress = (value: React.KeyboardEvent<HTMLInputElement>) => value.keyCode === 13 && this.regexCheck(value as any);
  public regexCheck = (value: React.FocusEvent<HTMLInputElement>) => {
    const [what, requestValue] = [value.currentTarget.name, value.currentTarget.value];

    if ((what === 'email' || what === 'username') && !(this.state[`${what}Check`] === 'success')) {
      if (!lib[`${what}Regex`].test(requestValue)) {
        return this.setState({ [(`${what}Check` as 'emailCheck') || (`${what}Check` as 'usernameCheck')]: 'regex' as 'regex' });
      }
      return this.doubleCheck(value);
    }

    if (what === 'password') {
      const regexCheck = lib.passwordRegex.test(requestValue);
      if (regexCheck) {
        this.setState({ [`${what}Check` as 'passwordCheck']: 'success' as 'success' });
        this.rpasswordRef.current !== null && this.rpasswordRef.current.focus();
      } else {
        this.setState({ [`${what}Check` as 'passwordCheck']: 'regex' as 'regex' });
      }
    }

    if (what === 'rpassword' && this.state.passwordCheck === 'success') {
      const registerFlag = this.state.password === this.state.rpassword;
      if (registerFlag) {
        this.setState({ [`${what}Check` as 'rpasswordCheck']: 'success' as 'success' });
        this.register();
      } else {
        this.setState({ [`${what}Check` as 'rpasswordCheck']: 'notSame' as 'notSame' });
      }
    }
  };

  public doubleCheckApiRequest = (what: string, value: string) =>
    axios.get(`/api/auth/duplication/${what}`, { params: { checkvalue: value } });
  public doubleCheck = (value: React.FocusEvent<HTMLInputElement>) => {
    const [what, requestValue] = [value.currentTarget.name, value.currentTarget.value];

    !(this.state[`${what}Check`] === 'success') &&
      this.doubleCheckApiRequest(what, requestValue)
        .then(
          (res: AxiosResponse<{ success: boolean; message: string }>) => (
            this.setState({ [(`${what}Check` as 'usernameCheck') || (`${what}Check` as 'emailCheck')]: 'success' as 'success' }),
            what === 'email'
              ? this.usernameRef.current !== null && this.usernameRef.current.focus()
              : this.passwordRef.current !== null && this.passwordRef.current.focus()
          )
        )
        .catch((err: AxiosError) =>
          this.setState({
            [(`${what}Check` as 'emailCheck') || (`${what}Check` as 'usernameCheck')]: 'duplicate' as 'duplicate'
          })
        );
  };

  public register = () => {
    if (
      this.state.emailCheck !== 'success' ||
      this.state.usernameCheck !== 'success' ||
      this.state.passwordCheck !== 'success' ||
      this.state.rpasswordCheck !== 'success'
    ) {
      return;
    }

    this.props.register({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });
  };

  render = () => (
    <>
      <div id="register-inputs">
        <span id={this.state.emailCheck === 'regex' ? 'register-show' : 'register-hide'} className="small-font-size thin-font-weight">
          이메일 형식에 맞게 작성해주세요 !
        </span>
        <span id={this.state.emailCheck === 'duplicate' ? 'register-show' : 'register-hide'} className="small-font-size thin-font-weight">
          중복되는 이메일 입니다 !
        </span>
        <input
          name="email"
          type="text"
          className={`${this.state.emailCheck === 'success' && 'success'} secondary-input radius large-font-size `}
          placeholder="이메일"
          onChange={this.onChange}
          onBlur={this.regexCheck}
          onKeyDown={this.keyPress}
          ref={this.emailRef}
        />
        <span id={this.state.usernameCheck === 'regex' ? 'register-show' : 'register-hide'} className="small-font-size thin-font-weight">
          3 - 16 길이, '_', '-', 숫자, 알파벳
        </span>
        <span
          id={this.state.usernameCheck === 'duplicate' ? 'register-show' : 'register-hide'}
          className="small-font-size thin-font-weight"
        >
          중복되는 이름입니다 !
        </span>
        <input
          name="username"
          type="text"
          className={`${this.state.usernameCheck === 'success' && 'success'} secondary-input radius large-font-size `}
          placeholder="이름"
          onChange={this.onChange}
          onBlur={this.regexCheck}
          onKeyDown={this.keyPress}
          ref={this.usernameRef}
        />
        <span id={this.state.passwordCheck === 'regex' ? 'register-show' : 'register-hide'} className="small-font-size thin-font-weight">
          6 - 20 길이, 영어 + 최소 한 개의 숫자 or 특수문자
        </span>
        <input
          name="password"
          type="password"
          className={`${this.state.passwordCheck === 'success' && 'success'} secondary-input radius large-font-size `}
          placeholder="비밀번호"
          onChange={this.onChange}
          onBlur={this.regexCheck}
          onKeyDown={this.keyPress}
          ref={this.passwordRef}
        />
        <span id={this.state.rpasswordCheck === 'notSame' ? 'register-show' : 'register-hide'} className="small-font-size thin-font-weight">
          비밀번호가 일치하지 않습니다 !
        </span>
        <input
          name="rpassword"
          type="password"
          className={`${this.state.rpasswordCheck === 'success' && 'success'} secondary-input radius large-font-size `}
          placeholder="비밀번호 재 입력"
          onChange={this.onChange}
          onKeyDown={this.keyPress}
          ref={this.rpasswordRef}
        />
      </div>
      <div id="register-buttons">
        <button className="secondary-reverse-button radius large-font-size" onClick={this.register}>
          회원가입
        </button>
      </div>
    </>
  );
}

export default RegisterComponent;
