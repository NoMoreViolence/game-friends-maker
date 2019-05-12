import { connect } from 'react-redux';
import { AppState, Status } from '../../../store/models';
import { loginActions, ILoginPayload, ILogin, SignActions } from '../../../store/actions';
import SignComponent from '../../../components/main/sign/sign.component';
import { bindActionCreators, Dispatch } from 'redux';

export interface ISignComponentProps {
  loginStatus: Status;
}

export interface ISignComponentMethod {
  login: (value: ILoginPayload) => ILogin;
}

const mapStateToProps = ({ user }: AppState): ISignComponentProps => ({
  loginStatus: user.loginStatus
});

const mapDispatchToProps = (dispatch: Dispatch<SignActions>) => ({
  login: bindActionCreators(loginActions.login, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignComponent);
