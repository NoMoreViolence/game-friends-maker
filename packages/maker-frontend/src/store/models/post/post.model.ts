import { PostInfo, PostLoaderStatus, PostStatus } from '@models';

export interface Post {
  postInfo: PostInfo;
  postLoaderStatus: PostLoaderStatus;
  postStatus: PostStatus;
}
