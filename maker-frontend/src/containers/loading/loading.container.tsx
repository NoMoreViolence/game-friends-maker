import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '@src/store/models';
import { isPostPending } from '@src/store/reducers/post.reducer';
import { isUserPending } from '../../store/reducers/user.reducer';
import LoadingComponent from '../../components/loading/loading.component';

export interface LoadingComponentProps {
  pending: boolean;
}
export interface LoadingComponentMethod {}

const mapStateToProps = (state: AppState): LoadingComponentProps => ({
  pending: isUserPending(state.user) || isPostPending(state.post),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingComponent);
