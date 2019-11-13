import { ImmerReducer, createActionCreators, createReducerFunction, Actions } from 'immer-reducer';
import { createSelector } from 'reselect';
import { Post, Status } from 'store/models';
import { GetPostsPayload, GetPostsSuccessPayload } from 'store/payloads';

export const postInitialState: Post = {
  postInfo: {
    myPosts: [],
    posts: [],
  },
  postLoaderStatus: {
    updatePost: 'initial',
    deletePost: 'initial',
  },
  postStatus: {
    getPosts: 'initial',
  },
};

export class PostReducer extends ImmerReducer<Post> {
  getPosts(payload: GetPostsPayload) {
    this.draftState.postStatus.getPosts = 'pending';
  }
  getPostsSuccess(payload: GetPostsSuccessPayload) {
    this.draftState.postInfo.posts = payload.posts;
    this.draftState.postStatus.getPosts = 'success';
  }
  getPostsFailure() {
    this.draftState.postStatus.getPosts = 'failure';
  }

  // createPost(payload: any) {}
  // createPostSuccess(payload: any) {}
  // createPostFailure(payload: any) {}
  // updatePost(payload: any) {}
  // updatePostSuccess(payload: any) {}
  // updatePostFailure(payload: any) {}
  // deletePost(payload: any) {}
  // deletePostSuccess(payload: any) {}
  // deletePostFailure(payload: any) {}
}
export type PostActions = Actions<typeof PostReducer>;
export const postActions = createActionCreators(PostReducer);
export const postReducerFunction = createReducerFunction(PostReducer, postInitialState);

export const getPostStatusSelector = (state: Post) => ({
  ...state.postLoaderStatus,
});

export const isPostPending = createSelector(
  [getPostStatusSelector],
  (userPendings: { [key: string]: Status }) =>
    Object.values(userPendings).filter(state => state === 'pending').length !== 0,
);
