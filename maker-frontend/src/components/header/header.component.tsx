import React from 'react';
import { HeaderProps } from '@containers/header/header.container';

class HeaderComponent extends React.Component<HeaderProps> {
  public fucking = () => {
    console.log('fuckyou');
  };

  public render() {
    return <div>Fucking</div>;
  }
}

export default HeaderComponent;
