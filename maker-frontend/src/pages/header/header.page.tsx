import * as React from 'react';
import './header.page.scss';
import { NavLink } from 'react-router-dom';
import HeaderContainer from 'containers/header/header.container';

const HeaderPage: React.SFC<{}> = () => (
  <header id="header" className="primary-background">
    <div>
      <NavLink id="logo-link" className="link title-font-size white-color radius" activeStyle={{ color: '#928cf7' }} to="/main">
        GFM
      </NavLink>
    </div>
    <div>
      <HeaderContainer />
    </div>
  </header>
);

export default HeaderPage;
