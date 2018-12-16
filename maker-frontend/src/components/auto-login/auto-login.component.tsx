import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props {}

interface Method {
  autoLogin: (value: { token: string }) => void;
}

class AutoLoginComponent extends React.PureComponent<Props & Method & RouteComponentProps> {
  componentDidMount = () => {
    const token = localStorage.getItem('token');
    token !== null ? this.props.autoLogin({ token }) : this.props.history.push('/main');
  };

  render = () => <></>;
}

export default AutoLoginComponent;
