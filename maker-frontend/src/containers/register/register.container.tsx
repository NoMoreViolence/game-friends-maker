import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, userActions } from 'store';
import Register from 'components/register/register.component';
import { withRouter, RouteComponentProps } from 'react-router';

export interface RegisterProps {
  registerStatus: 'none' | 'pending' | 'success' | 'error';
  loginStatus: 'none' | 'pending' | 'success' | 'error';
}

export interface RegisterMethod {
  register: (value: { username: string; email: string; password: string }) => void;
}

const RegisterContainer: React.SFC<RegisterProps & RegisterMethod & RouteComponentProps<any>> = props => (
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
  connect<RegisterProps, RegisterMethod, {}, {}>(
    ({ user }: AppState) => ({
      registerStatus: user.registerStatus,
      loginStatus: user.loginStatus
    }),
    dispatch => ({
      register: bindActionCreators(userActions.register, dispatch)
    })
  )(RegisterContainer)
);
