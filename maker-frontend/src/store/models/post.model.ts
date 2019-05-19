import { Status } from './common.model';

export interface Post {
  postsData: PostData;
  getPostStatus: Status;
}

export interface PostData {
  posts: PostUnit[];
  limit: number;
  offset: number;
  searchInput: string;
}

export interface PostUnit {
  organizer: string;
  name: string;
  content: string;
  date: Date;
}
