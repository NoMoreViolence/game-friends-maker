import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, userActions } from 'store';
import Register from 'components/register/register.component';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props {
  registerPending: boolean;
  registerSuccess: boolean;
  loginSuccess: boolean;
}

interface Method {
  register: (value: { username: string; email: string; password: string }) => void;
}

const RegisterContainer: React.SFC<Props & Method & RouteComponentProps<any>> = props => (
  <Register
    registerPending={props.registerPending}
    registerSuccess={props.registerSuccess}
    loginSuccess={props.loginSuccess}
    register={props.register}
    history={props.history}
    location={props.location}
    match={props.match}
  />
);

export default withRouter(
  connect<Props, Method, {}, {}>(
    ({ user }: AppState) => ({
      registerSuccess: user.registerSuccess,
      registerPending: user.registerPending,
      loginSuccess: user.loginSuccess
    }),
    dispatch => ({
      register: bindActionCreators(userActions.register, dispatch)
    })
  )(RegisterContainer)
);
