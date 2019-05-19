import { Action } from 'redux';
// import { GoogleTokenPayload } from '@models';
import { createStandardAction } from 'typesafe-actions';

export enum PostActionTypes {
  GET_POSTS = 'GET_POSTS',
  GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS',
  GET_POSTS_FAILURE = 'GET_POSTS_FAILURE',
  SEARCH_POST = 'SEARCH_POST',
  SEARCH_POST_SUCCESS = 'SEARCH_POST_SUCCESS',
  SEARCH_POST_FAILURE = 'SEARCH_POST_FAILURE',
}

export class GetPosts implements Action {
  public readonly type = PostActionTypes.GET_POSTS;

  // public constructor() {}
}
export class GetPostsSuccess implements Action {
  public readonly type = PostActionTypes.GET_POSTS_SUCCESS;

  // public constructor() {}
}
export class GetPostsFailure implements Action {
  public readonly type = PostActionTypes.GET_POSTS_FAILURE;

  // public constructor() {}
}

export interface SearchPostPayload {
  searchInput: string;
  offset: number;
  limit: number;
}
export class SearchPost implements Action {
  public readonly type = PostActionTypes.SEARCH_POST;

  public constructor(public payload: SearchPostPayload) {}
}
export class SearchPostSuccess implements Action {
  public readonly type = PostActionTypes.SEARCH_POST_SUCCESS;

  // public constructor() {}
}
export class SearchPostFailure implements Action {
  public readonly type = PostActionTypes.SEARCH_POST_FAILURE;

  // public constructor() {}
}

export const postActions = {
  getPosts: createStandardAction(PostActionTypes.GET_POSTS)(),
  searchPost: createStandardAction(PostActionTypes.SEARCH_POST)<SearchPostPayload>(),
};

export type PostActions = | GetPosts
| GetPostsSuccess
| GetPostsFailure
| SearchPost
| SearchPostSuccess
| SearchPostFailure;
