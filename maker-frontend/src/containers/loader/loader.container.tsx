import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, userActions } from 'store';
import LoaderComponent from 'components/loader/loader.component';

export interface LoaderProps {
  loginStatus: 'none' | 'pending' | 'success' | 'error';
  registerStatus: 'none' | 'pending' | 'success' | 'error';
  profileStatus: 'none' | 'pending' | 'success' | 'error';
}

export interface LoaderMethod {}

const LoaderContainer: React.SFC<LoaderProps & LoaderMethod> = props => (
  <LoaderComponent loginStatus={props.loginStatus} registerStatus={props.registerStatus} profileStatus={props.profileStatus} />
);

export default connect<LoaderProps, LoaderMethod, {}, {}>(
  ({ user, profile }: AppState) => ({
    loginStatus: user.loginStatus,
    registerStatus: user.registerStatus,
    profileStatus: profile.actionStatus
  }),
  dispatch => ({})
)(LoaderContainer);
