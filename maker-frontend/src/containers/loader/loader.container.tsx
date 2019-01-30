import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, userActions } from 'store';
import LoaderComponent from 'components/loader/loader.component';

interface Props {
  loginStatus: 'none' | 'pending' | 'success';
  registerStatus: 'none' | 'pending' | 'success';
}

interface Method {}

const LoaderContainer: React.SFC<Props & Method> = props => (
  <LoaderComponent loginStatus={props.loginStatus} registerStatus={props.registerStatus} />
);

export default connect<Props, Method, {}, {}>(
  ({ user }: AppState) => ({
    loginStatus: user.loginStatus,
    registerStatus: user.registerStatus
  }),
  dispatch => ({})
)(LoaderContainer);
