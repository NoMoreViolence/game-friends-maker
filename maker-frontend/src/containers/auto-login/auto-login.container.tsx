import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, userActions } from 'store';
import AutoLoginComponent from 'components/auto-login/auto-login.component';

interface Props {}

interface Method {
  autoLogin: (value: { token: string }) => void;
}

const LoginAutoContainer: React.SFC<Props & Method> = props => <AutoLoginComponent autoLogin={props.autoLogin} />;

export default connect<Props, Method, {}, {}>(
  ({  }: AppState) => ({}),
  dispatch => ({
    autoLogin: bindActionCreators(userActions.autoLogin, dispatch)
  })
)(LoginAutoContainer);
