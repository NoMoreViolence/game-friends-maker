import { produce } from 'immer';
import { createSelector } from 'reselect';
import { Status, Post } from '../models';
import { PostActions } from '../actions';

export const postInitialState: Post = {
  postsData: {
    posts: [],
    limit: 20,
    offset: 0,
    searchInput: '',
    searchGames: [],
  },
  postStatus: {
    getPostStatus: 'initial',
  },
};

export const postReducer = (state: Post = postInitialState, action: PostActions) =>
  produce(state, (draft: Post) => {
    switch (action.type) {
      case 'GET_POSTS':
        break;

      case 'SEARCH_POST':
        // draft.postStatus.getPostStatus = 'pending';
        draft.postsData.searchInput = action.payload.searchInput;
        break;
      case 'SEARCH_POST_SUCCESS':
        draft.postStatus.getPostStatus = 'success';
        break;
      case 'SEARCH_POST_FAILURE':
        draft.postStatus.getPostStatus = 'failure';
        break;
      default:
        break;
    }
  });

export const getStatusSelector = (state: Post) => ({
  ...state.postStatus,
});

export const isPostPending = createSelector(
  [getStatusSelector],
  (postPending: { [key: string]: Status }) =>
    !(Object.values(postPending).filter(state => state === 'pending').length === 0),
);
