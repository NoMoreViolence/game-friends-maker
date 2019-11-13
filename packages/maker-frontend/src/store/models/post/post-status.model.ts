import { Status } from '../common';

export interface PostLoaderStatus {
  updatePost: Status;
  deletePost: Status;
}

export interface PostStatus {
  getPosts: Status;
}
