import { Action } from 'redux';
// import { GoogleTokenPayload } from '@models';
import { createStandardAction } from 'typesafe-actions';

export enum PostActionTypes {
  GET_POSTS = 'GET_POSTS',
  GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS',
  GET_POSTS_FAILURE = 'GET_POSTS_FAILURE',

  GET_GAMES = 'GET_GAMES',
  GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS',
  GET_GAMES_FAILURE = 'GET_GAMES_FAILURE',

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

export interface GetGamesPayload {}
export class GetGames implements Action {
  public readonly type = PostActionTypes.GET_GAMES;

  public constructor(public payload: GetGamesPayload) {}
}
export interface GetGamesSuccessPayload {}
export class GetGamesSuccess implements Action {
  public readonly type = PostActionTypes.GET_GAMES_SUCCESS;

  public constructor(public payload: GetGamesSuccessPayload) {}
}
export class GetGamesFailure implements Action {
  public readonly type = PostActionTypes.GET_GAMES_FAILURE;
}

export interface SearchPostPayload {
  searchInput: string;
  game: string[];
  offset: number;
  limit: number;
}
export class SearchPost implements Action {
  public readonly type = PostActionTypes.SEARCH_POST;

  public constructor(public payload: SearchPostPayload) {}
}
export interface SearchPostSuccessPayload {
  raws: unknown[];
  count: number;
}
export class SearchPostSuccess implements Action {
  public readonly type = PostActionTypes.SEARCH_POST_SUCCESS;

  public constructor(public payload: SearchPostSuccessPayload) {}
}
export class SearchPostFailure implements Action {
  public readonly type = PostActionTypes.SEARCH_POST_FAILURE;

  // public constructor() {}
}

export const postActions = {
  getPosts: createStandardAction(PostActionTypes.GET_POSTS)(),
  searchPost: createStandardAction(PostActionTypes.SEARCH_POST)<SearchPostPayload>(),
  getGames: createStandardAction(PostActionTypes.GET_GAMES)<GetGamesPayload>(),
};

export type PostActions = | GetPosts
| GetPostsSuccess
| GetPostsFailure
| GetGames
| GetGamesSuccess
| GetGamesFailure
| SearchPost
| SearchPostSuccess
| SearchPostFailure;
