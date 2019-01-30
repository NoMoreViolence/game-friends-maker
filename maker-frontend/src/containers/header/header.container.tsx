import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState, userActions } from 'store';
import HeaderComponent from 'components/header/header.component';

interface Props {
  username: string;
  loginStatus: 'none' | 'success' | 'pending';
  admin: boolean;
}

interface Method {
  logout: () => void;
}

const HeaderContainer: React.SFC<Props & Method & RouteComponentProps<any>> = props => {
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
  connect<Props, Method, {}, {}>(
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
