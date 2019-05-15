import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, Status } from '../../../store/models';
import {
  RegisterPayload, Register, SignActions, signActions,
} from '@actions';
import SignComponent from '../../../components/main/sign/sign.component';

export interface SignComponentProps {
  registerStatus: Status;
  loginStatus: Status;
}

export interface SignComponentMethod {
  register: (value: RegisterPayload) => Register;
}

const mapStateToProps = ({ user }: AppState): SignComponentProps => ({
  registerStatus: user.registerStatus,
  loginStatus: user.loginStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<SignActions>): SignComponentMethod => ({
  register: bindActionCreators(signActions.register, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignComponent);
