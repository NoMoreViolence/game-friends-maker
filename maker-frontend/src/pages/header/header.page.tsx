import React, { FC } from 'react';
import './header.page.scss';
import HeaderContainer from '@containers/header/header.container';

const HeaderPage: FC = () => (
  <div id="header-container">
    <div className="header-content">
      <HeaderContainer />
    </div>
  </div>
);

export default HeaderPage;
