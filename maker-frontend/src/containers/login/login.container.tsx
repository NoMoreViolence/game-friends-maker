import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, userActions } from 'store';
import Login from 'components/login/login.component';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props {
  loginStatus: 'none' | 'pending' | 'success';
}

interface Method {
  login: (value: { email: string; password: string }) => void;
}

const LoginContainer: React.SFC<Props & Method & RouteComponentProps<any>> = props => (
  <Login loginStatus={props.loginStatus} login={props.login} history={props.history} location={props.location} match={props.match} />
);

export default withRouter(
  connect<Props, Method, {}, {}>(
    ({ user }: AppState) => ({
      loginStatus: user.loginStatus
    }),
    dispatch => ({
      login: bindActionCreators(userActions.login, dispatch)
    })
  )(LoginContainer)
);
