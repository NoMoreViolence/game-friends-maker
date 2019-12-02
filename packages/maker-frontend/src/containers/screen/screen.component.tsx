import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { useRouter } from 'helpers';
import { USER } from 'graphqls/queries/USER';
import { Container } from 'ui';
import { GlobalStyle, ScrollContainer } from './screen.styled';
import LoadingComponent from 'components/loading';
import TeamContainer from './containers/team';
import ScreenHeaderComponent from './components/header';
import { useUserStateDispatch } from 'context';
import { User } from 'graphqls/queries/__generated__/User';

const ScreenComponent = () => {
  const { push } = useRouter();
  const dispatch = useUserStateDispatch();
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

  return (
    <Container>
      <GlobalStyle />
      <ScreenHeaderComponent />
      <ScrollContainer>
        <Switch>
          <Route path="/app/team" component={TeamContainer} />
          <Route path="/app/news" />
          <Route path="/app/message" />
          <Redirect to="/app/team" />
        </Switch>
      </ScrollContainer>
    </Container>
  );
};

export default ScreenComponent;
