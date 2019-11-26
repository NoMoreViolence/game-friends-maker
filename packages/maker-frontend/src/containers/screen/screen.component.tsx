import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { useRouter } from 'helpers';
import { USER } from 'graphqls/queries/USER';
import { User, UserQueryVariables } from 'graphqls/generated/graphql';
import { Container } from 'ui';
import { GlobalStyle, ScrollContainer } from './screen.styled';
import LoadingComponent from 'components/loading';
import PostContainer from './containers/post';
import ScreenHeaderComponent from './components/header';
import { useUserStateDispatch } from 'context';

const ScreenComponent = () => {
  const { push } = useRouter();
  const dispatch = useUserStateDispatch();
  const { loading } = useQuery<User, UserQueryVariables>(USER, {
    onError: () => {
      localStorage.removeItem('token');
      push('/');
    },
    onCompleted: userState => dispatch({ type: 'SAVE', userState }),
  });

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Container>
      <GlobalStyle />
      <ScreenHeaderComponent />
      <ScrollContainer pr={16} pl={16}>
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
