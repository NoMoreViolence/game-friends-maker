import React from 'react';
import { Switch, Route } from 'react-router-dom';
import useReactRouter from 'use-react-router';

import { ScreenRootDiv, GlobalStyle } from './screen.styled';

import HeaderComponent from '@containers/screen/components/header';
import PostsComponent from '@containers/posts';

const ScreenComponent = () => {
  const { match } = useReactRouter();

  return (
    <ScreenRootDiv>
      <GlobalStyle />
      <HeaderComponent />
      <Switch>
        <Route path={`${match.url}/post`} component={PostsComponent} />
      </Switch>
    </ScreenRootDiv>
  );
};

export default ScreenComponent;
