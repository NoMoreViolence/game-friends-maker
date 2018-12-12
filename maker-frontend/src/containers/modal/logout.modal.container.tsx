import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState, userActions } from 'store';
import LogoutModalComponent from 'components/modal/logout.modal.component';

interface RealProps {
  close: () => void;
}
interface Props {}
interface Method {
  logout: () => void;
}

const LogoutModalContainer: React.SFC<RealProps & Props & Method> = props => {
  return <LogoutModalComponent close={props.close} logout={props.logout} />;
};

export default connect<Props, Method, {}, {}>(
  ({ user }: AppState) => ({}),
  dispatch => ({
    logout: bindActionCreators(userActions.logout, dispatch)
  })
)(LogoutModalContainer);
