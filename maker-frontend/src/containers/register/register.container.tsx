import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, userActions } from 'store';
import Register from 'components/register/register.component';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props {
  registerStatus: 'none' | 'pending' | 'success';
  loginStatus: 'none' | 'pending' | 'success';
}

interface Method {
  register: (value: { username: string; email: string; password: string }) => void;
}

const RegisterContainer: React.SFC<Props & Method & RouteComponentProps<any>> = props => (
  <Register
    registerStatus={props.registerStatus}
    loginStatus={props.loginStatus}
    register={props.register}
    history={props.history}
    location={props.location}
    match={props.match}
  />
);

export default withRouter(
  connect<Props, Method, {}, {}>(
    ({ user }: AppState) => ({
      registerStatus: user.registerStatus,
      loginStatus: user.loginStatus
    }),
    dispatch => ({
      register: bindActionCreators(userActions.register, dispatch)
    })
  )(RegisterContainer)
);
