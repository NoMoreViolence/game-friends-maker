import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState, userActions } from 'store';
import HeaderComponent from 'components/header/header.component';

interface Props {
  username: string;
  loginSuccess: boolean;
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
      loginSuccess={props.loginSuccess}
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
      loginSuccess: user.loginSuccess,
      admin: user.admin
    }),
    dispatch => ({
      logout: bindActionCreators(userActions.logout, dispatch)
    })
  )(HeaderContainer)
);
