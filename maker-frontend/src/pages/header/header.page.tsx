import * as React from 'react';
import './header.page.scss';
import { NavLink } from 'react-router-dom';
import HeaderContainer from 'containers/header/header.container';

const Header: React.SFC<{}> = () => (
  <header id="header" className="primary-background">
    <div>
      <NavLink id="logo-link" className="link title-font-size white-color radius" activeClassName="link-current" to="/main">
        GFM
      </NavLink>
    </div>
    <div>
      <HeaderContainer />
    </div>
  </header>
);

export default Header;
