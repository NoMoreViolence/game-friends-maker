import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState, userActions } from 'store';
import AutoLoginComponent from 'components/auto-login/auto-login.component';

interface Props {}

interface Method {
  autoLogin: (value: { token: string }) => void;
}

const LoginAutoContainer: React.SFC<Props & Method & RouteComponentProps> = props => (
  <AutoLoginComponent autoLogin={props.autoLogin} history={props.history} match={props.match} location={props.location} />
);

export default withRouter(
  connect<Props, Method, {}, {}>(
    ({  }: AppState) => ({}),
    dispatch => ({
      autoLogin: bindActionCreators(userActions.autoLogin, dispatch)
    })
  )(LoginAutoContainer)
);
