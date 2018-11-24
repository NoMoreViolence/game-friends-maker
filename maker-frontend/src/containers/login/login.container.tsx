import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions } from 'store/actions';
import { AppState } from 'store/models';
import Login from 'components/login/login.component';

interface Props {
  loginSuccess: boolean;
  loginPending: boolean;
}

interface Method {
  signIn: (value: { email: string; password: string }) => any;
}

class LoginContainer extends React.PureComponent<Props & Method> {
  public render = () => <Login loginSuccess={this.props.loginSuccess} loginPending={this.props.loginPending} signIn={this.props.signIn} />;
}

export default connect<Props, Method, {}, {}>(
  ({ user }: AppState) => ({
    loginSuccess: user.loginSuccess,
    loginPending: user.loginPending
  }),
  dispatch => ({
    signIn: bindActionCreators(userActions.signIn, dispatch)
  })
)(LoginContainer);
