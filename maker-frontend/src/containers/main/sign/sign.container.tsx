import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../store/models';
import { SignActions } from '../../../store/actions';

const mapStateToProps = (state: AppState) => ({
  token: state.user.token,
  expiresIn: state.user.expiresIn
});

const mapDispatchToProps = (dispatch: SignActions) => ({});

const a = () => <div />;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(a);
