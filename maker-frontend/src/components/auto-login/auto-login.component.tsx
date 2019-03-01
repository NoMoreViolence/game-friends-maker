import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AutoLoginProps, AutoLoginMethod } from 'containers/auto-login/auto-login.container';

class AutoLoginComponent extends React.PureComponent<AutoLoginProps & AutoLoginMethod & RouteComponentProps> {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token !== null) {
      return this.props.autoLogin({ token });
    }
    return this.props.history.push('/main');
  }

  componentDidUpdate(prevProps: AutoLoginProps & AutoLoginMethod & RouteComponentProps<any>) {
    if (this.props.autoLoginStatus !== prevProps.autoLoginStatus && this.props.autoLoginStatus === 'error') {
      this.props.history.push('/main');
    }
  }

  render() {
    return <></>;
  }
}

export default AutoLoginComponent;
