import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { useRouter, useDetectTeamUserJoinId } from 'helpers';
import { USER } from 'graphqls/queries/USER';
import { Container } from 'ui';
import { GlobalStyle, ScrollContainer } from './screen.styled';
import { LoadingComponent } from 'components/loading';
import { Home } from './home';
import { Team } from './team';
import { ScreenHeaderComponent } from './components/header';
import { SidebarWrapper } from './components/sidebar';
import { useUserStateDispatch } from 'context';
import { User } from 'graphqls/queries/__generated__/User';

export const ScreenComponent: FC = () => {
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
  useDetectTeamUserJoinId();

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <SidebarWrapper>
        <GlobalStyle />
        <Container>
          <ScreenHeaderComponent />
          <ScrollContainer>
            <Switch>
              <Route path="/app/team" component={Team} />
              <Route path="/app/home" component={Home} />
            </Switch>
          </ScrollContainer>
        </Container>
      </SidebarWrapper>
    </>
  );
};
