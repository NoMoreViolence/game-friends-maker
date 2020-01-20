import { useQuery } from '@apollo/react-hooks';
import { LoadingComponent } from 'components/loading';
import { useUserStateDispatch } from 'context';
import { USER } from 'graphqls/queries/USER';
import { User } from 'graphqls/queries/__generated__/User';
import { useDetectTeamUserJoinId, useRouter } from 'helpers';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Container } from 'ui';
import { ScreenHeaderComponent } from './header';
import { Home } from './home';
import { GlobalStyle, ScrollContainer } from './screen.styled';
import { SidebarWrapper } from './sidebar';
import { Team } from './team';

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
