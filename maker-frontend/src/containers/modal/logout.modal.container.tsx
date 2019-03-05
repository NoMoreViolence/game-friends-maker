import * as React from 'react';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState, userActions } from 'store';
import LogoutModalComponent from 'components/modal/logout.modal.component';

export interface LogoutProps {
  close: () => void;
}
export interface LogoutMethod {
  logout: () => void;
}

const LogoutModalContainer: React.SFC<LogoutProps & LogoutMethod & RouteComponentProps> = props => {
  return (
    <LogoutModalComponent history={props.history} location={props.location} match={props.match} close={props.close} logout={props.logout} />
  );
};

export default withRouter(
  connect<{}, LogoutMethod, LogoutProps & RouteComponentProps, {}>(
    ({  }: AppState) => ({}),
    (dispatch: Dispatch<Action<any>>) => ({
      logout: bindActionCreators(userActions.logout, dispatch)
    })
  )(LogoutModalContainer)
);
