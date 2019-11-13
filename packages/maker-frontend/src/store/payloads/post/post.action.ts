import { PostItem } from 'store/models/database';

export interface CreatePostPayload {}

export interface GetPostsPayload {
  gameName?: string;
  offset: number;
}
export interface GetPostsSuccessPayload {
  posts: PostItem[];
}
