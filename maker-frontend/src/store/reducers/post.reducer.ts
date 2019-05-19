import { produce } from 'immer';
import { createSelector } from 'reselect';
import { User, Status, Post } from '../models';
import { PostActions } from '../actions';

export const postInitialState: Post = {
  postsData: {
    posts: [],
    limit: 20,
    offset: 0,
    searchInput: '',
  },
  getPostStatus: 'initial',
};

export const postReducer = (state: Post = postInitialState, action: PostActions) =>
  produce(state, (draft: User) => {
    switch (action.type) {
      case 'GET_POSTS':
        break;

      default:
        break;
    }
  });

export const getStatusSelector = (state: Post) => ({
  getPostStatus: state.getPostStatus,
});

export const isPostPending = createSelector(
  [getStatusSelector],
  (userPendings: { [key: string]: Status }) =>
    !(Object.values(userPendings).filter(state => state === 'pending').length === 0),
);
