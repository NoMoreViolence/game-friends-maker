import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { ScreenRootDiv, GlobalStyle, StyledContainer } from './screen.styled';
import { USER } from 'graphqls/queries/USER';
import { User, UserQueryVariables } from 'graphqls/generated/graphql';
import { useRouter } from 'helpers';
import LoadingComponent from 'components/loading';
import PostContainer from './containers/post';
import ScreenHeaderComponent from './components/header';
import { Container } from 'ui';

const ScreenComponent = () => {
  const { push } = useRouter();
  const { loading } = useQuery<User, UserQueryVariables>(USER, {
    onError: () => {
      localStorage.removeItem('token');
      push('/');
    },
  });

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <ScreenRootDiv>
      <GlobalStyle />
      <StyledContainer>
        <Container>
          <ScreenHeaderComponent />
          <Switch>
            <Route path="/app/post" component={PostContainer} />
            <Route path="/app/news" />
            <Route path="/app/message" />
            <Redirect to="/app/post" />
          </Switch>
        </Container>
      </StyledContainer>
    </ScreenRootDiv>
  );
};

export default ScreenComponent;
