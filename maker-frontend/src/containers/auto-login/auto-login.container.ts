import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '@src/store/models';
import {
  signActions, SignActions, GetMyInfoPayload, GetMyInfo,
} from '@actions';
import AutoLoginComponent from '@src/components/auto-login/auto-login.component';

export interface AutoLoginComponentProps {}
export interface AutoLoginComponentMethod {
  getMyInfo: (value: GetMyInfoPayload) => GetMyInfo;
}

const mapStateToProps = ({ user }: AppState): AutoLoginComponentProps => ({});
const mapDispatchToProps = (dispatch: Dispatch<SignActions>): AutoLoginComponentMethod => ({
  getMyInfo: bindActionCreators(signActions.getMyInfo, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoLoginComponent);
