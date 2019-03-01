import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState, userActions } from 'store';
import AutoLoginComponent from 'components/auto-login/auto-login.component';

export interface AutoLoginProps {
  autoLoginStatus: 'none' | 'success' | 'pending' | 'error';
}

export interface AutoLoginMethod {
  autoLogin: (value: { token: string }) => void;
}

const LoginAutoContainer: React.SFC<AutoLoginProps & AutoLoginMethod & RouteComponentProps> = props => (
  <AutoLoginComponent
    autoLoginStatus={props.autoLoginStatus}
    autoLogin={props.autoLogin}
    history={props.history}
    match={props.match}
    location={props.location}
  />
);

export default withRouter(
  connect<AutoLoginProps, AutoLoginMethod, {}, {}>(
    ({ user }: AppState) => ({
      autoLoginStatus: user.autoLoginStatus
    }),
    dispatch => ({
      autoLogin: bindActionCreators(userActions.autoLogin, dispatch)
    })
  )(LoginAutoContainer)
);
