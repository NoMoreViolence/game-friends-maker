import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '@src/store/models';
import { isUserPending } from '../../store/reducers/user.reducer';
import LoadingComponent from '../../components/loading/loading.component';

export interface ILoadingComponentProps {
  pending: boolean;
}
export interface ILoadingComponentMethod {}

const mapStateToProps = (state: AppState): ILoadingComponentProps => ({
  pending: isUserPending(state.user),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect<ILoadingComponentProps, ILoadingComponentMethod, {}, any>(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingComponent);
