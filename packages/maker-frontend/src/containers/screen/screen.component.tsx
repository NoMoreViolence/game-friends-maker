import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ScreenRootDiv, GlobalStyle } from './screen.styled';

import HeaderComponent from '@containers/screen/components/header';
import PostsComponent from '@containers/posts';

const ScreenComponent = () => (
  <ScreenRootDiv>
    <GlobalStyle />
    <HeaderComponent />
    <Switch>
      <Route path={'/app/post'} component={PostsComponent} />
      {/* <Route path={`${match.url}/news`} component={NewsComponent} /> */}
      {/* <Route path={`${match.url}/message`} component={MessageComponent} /> */}
      <Redirect to={'/app/post'} />
    </Switch>
  </ScreenRootDiv>
);

export default ScreenComponent;
