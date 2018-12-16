import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, userActions } from 'store';
import LoaderComponent from 'components/loader/loader.component';

interface Props {
  loginPending: boolean;
  registerPending: boolean;
}

interface Method {}

const LoaderContainer: React.SFC<Props & Method> = props => (
  <LoaderComponent loginPending={props.loginPending} registerPending={props.registerPending} />
);

export default connect<Props, Method, {}, {}>(
  ({ user }: AppState) => ({
    loginPending: user.loginPending,
    registerPending: user.registerPending
  }),
  dispatch => ({})
)(LoaderContainer);
