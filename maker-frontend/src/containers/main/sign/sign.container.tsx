import { connect } from 'react-redux';
import { AppState, Status } from '../../../store/models';
import { signActions, IRegisterPayload, IRegister, SignActions } from '../../../store/actions';
import SignComponent from '../../../components/main/sign/sign.component';
import { bindActionCreators, Dispatch } from 'redux';

export interface ISignComponentProps {
  registerStatus: Status;
}

export interface ISignComponentMethod {
  register: (value: IRegisterPayload) => IRegister;
}

const mapStateToProps = ({ user }: AppState): ISignComponentProps => ({
  registerStatus: user.registerStatus
});

const mapDispatchToProps = (dispatch: Dispatch<SignActions>) => ({
  register: bindActionCreators(signActions.register, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignComponent);
