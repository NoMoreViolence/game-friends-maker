import { Status } from './common.model';

export interface Post {
  postsData: PostData;
  postStatus: PostStatus;
}

export interface PostData {
  posts: PostUnit[];
  limit: number;
  offset: number;
  searchInput: string;
  searchGames: string[];
}

export interface PostUnit {
  organizer: string;
  name: string;
  content: string;
  date: Date;
}

export interface PostStatus {
  getPostStatus: Status;
}
