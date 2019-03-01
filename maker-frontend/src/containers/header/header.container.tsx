import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState, userActions } from 'store';
import HeaderComponent from 'components/header/header.component';

export interface HeaderProps {
  username: string;
  loginStatus: 'none' | 'success' | 'pending' | 'error';
  admin: boolean;
}

export interface HeaderMethod {
  logout: () => void;
}

const HeaderContainer: React.SFC<HeaderProps & HeaderMethod & RouteComponentProps<any>> = props => {
  const { match, location, history } = props;

  return (
    <HeaderComponent
      username={props.username}
      loginStatus={props.loginStatus}
      admin={props.admin}
      logout={props.logout}
      history={history}
      location={location}
      match={match}
    />
  );
};

export default withRouter(
  connect<HeaderProps, HeaderMethod, {}, {}>(
    ({ user }: AppState) => ({
      username: user.username,
      loginStatus: user.loginStatus,
      admin: user.admin
    }),
    dispatch => ({
      logout: bindActionCreators(userActions.logout, dispatch)
    })
  )(HeaderContainer)
);
