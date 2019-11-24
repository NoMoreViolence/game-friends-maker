import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { ScreenRootDiv, GlobalStyle } from './screen.styled';
import { USER } from 'graphqls/queries/USER';
import { User, UserQueryVariables } from 'graphqls/generated/graphql';
import { useRouter } from 'helpers';
import LoadingComponent from 'components/loading';

const ScreenComponent = () => {
  const { push } = useRouter();
  const { loading, error } = useQuery<User, UserQueryVariables>(USER);

  if (error) {
    localStorage.removeItem('token');
    push('/');
    return null;
  }
  if (loading) {
    return <LoadingComponent isLoading={true} />;
  }

  return (
    <ScreenRootDiv>
      <GlobalStyle />
      <Switch>
        <Route path="app/news" />
        <Route path="app/message" />
        <Redirect to="/app/post" />
      </Switch>
    </ScreenRootDiv>
  );
};

export default ScreenComponent;
