import React from 'react';
import { AutoLoginComponentProps, AutoLoginComponentMethod } from '@src/containers/auto-login/auto-login.container';

class AutoLoginComponent extends React.Component<AutoLoginComponentProps & AutoLoginComponentMethod> {
  public componentDidMount = () => {
    const { getMyInfo } = this.props;

    const token = localStorage.getItem('token');
    if (token !== null) {
      const payload = {
        token,
      };

      getMyInfo(payload);
    }
  };

  public render = () => <></>;
}

export default AutoLoginComponent;
