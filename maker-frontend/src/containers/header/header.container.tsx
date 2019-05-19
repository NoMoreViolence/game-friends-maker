import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState, Status } from '@src/store/models';
import { SearchPostPayload, SearchPost, postActions } from '@actions';
import HeaderComponent from '@components/header/header.component';

export interface HeaderComponentProps {
  searchInput: string;
  signStatus: Status;
}
export interface HeaderComponentMethod {
  searchPost: (p: SearchPostPayload) => SearchPost;
}
export type HeaderProps = HeaderComponentProps & HeaderComponentMethod & RouteComponentProps;

const mapStateToProps = ({ user, post }: AppState, ownProps: RouteComponentProps): HeaderComponentProps => ({
  searchInput: post.postsData.searchInput,
  signStatus: user.loginStatus,
});
const mapDispatchToProps = (dispatch: Dispatch, ownProps: RouteComponentProps): HeaderComponentMethod => ({
  searchPost: bindActionCreators(postActions.searchPost, dispatch),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HeaderComponent),
);
