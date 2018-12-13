import * as React from 'react';

interface Props {}

interface Method {
  autoLogin: (value: { token: string }) => void;
}

class AutoLoginComponent extends React.PureComponent<Props & Method> {
  componentDidMount = () => {
    const token = localStorage.getItem('token');
    token !== null && this.props.autoLogin({ token });
  };

  render = () => <></>;
}

export default AutoLoginComponent;
