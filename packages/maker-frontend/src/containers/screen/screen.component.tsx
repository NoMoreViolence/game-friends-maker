import React, { FC, useState, useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { useRouter, useDetectTeamUserJoinId } from 'helpers';
import { USER } from 'graphqls/queries/USER';
import { Container } from 'ui';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GlobalStyle, ScrollContainer } from './screen.styled';
import { LoadingComponent } from 'components/loading';
import { Home } from './home';
import { Team } from './team';
import { ScreenHeaderComponent } from './header';
import { SidebarWrapper } from './sidebar';
import { useUserStateDispatch } from 'context';
import { User } from 'graphqls/queries/__generated__/User';

export const ScreenComponent: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarHold, setIsSidebarHold] = useState(window.innerWidth > 768);
  useEffect(() => {
    const resize = fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
        if (window.innerWidth > 768) {
          setIsSidebarHold(true);
        } else {
          setIsSidebarHold(false);
        }
      });
    return () => {
      resize.unsubscribe();
    };
  }, []);
  const toggleIsSidebarOpen = useCallback(() => setIsSidebarOpen(val => !val), []);
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
      <SidebarWrapper
        isSidebarOpen={isSidebarOpen}
        isSidebarHold={isSidebarHold}
        toggleIsSidebarOpen={toggleIsSidebarOpen}
      >
        <GlobalStyle />
        <Container>
          <ScreenHeaderComponent isSidebarHold={isSidebarHold} toggleIsSidebarOpen={toggleIsSidebarOpen} />
          <ScrollContainer mt={70}>
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
