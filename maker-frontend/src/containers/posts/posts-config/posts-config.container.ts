import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, PostUnit } from '@src/store/models';
import PostsConfigComponent from '@components/posts/posts-config';

export interface PostsListComponentProps {
  posts: PostUnit[];
}
export interface PostsListComponentMethod {}

const mapStateToProps = ({ post }: AppState): PostsListComponentProps => ({
  posts: post.postsData.posts,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsConfigComponent);
