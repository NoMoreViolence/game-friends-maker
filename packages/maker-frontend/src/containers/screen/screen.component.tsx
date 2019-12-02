import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { useRouter } from 'helpers';
import { USER } from 'graphqls/queries/USER';
import { Container } from 'ui';
import { GlobalStyle, ScrollContainer } from './screen.styled';
import LoadingComponent from 'components/loading';
import PostContainer from './containers/post';
import ScreenHeaderComponent from './components/header';
import { useUserStateDispatch, useUserState } from 'context';
import { User } from 'graphqls/queries/__generated__/User';

const ScreenComponent = () => {
  const { push } = useRouter();
  const dispatch = useUserStateDispatch();
  const { user } = useUserState();
  const { loading } = useQuery<User>(USER, {
    onError: () => {
      localStorage.removeItem('token');
      push('/');
    },
    onCompleted: userState =>
      dispatch({
        type: 'SAVE',
        userState: userState.user,
      }),
  });

  if (loading) {
    return <LoadingComponent />;
  }
  if (!user) {
  }

  return (
    <Container>
      <GlobalStyle />
      <ScreenHeaderComponent />
      <ScrollContainer>
        <Switch>
          <Route path="/app/post" component={PostContainer} />
          <Route path="/app/news" />
          <Route path="/app/message" />
          <Redirect to="/app/post" />
        </Switch>
      </ScrollContainer>
    </Container>
  );
};

export default ScreenComponent;
