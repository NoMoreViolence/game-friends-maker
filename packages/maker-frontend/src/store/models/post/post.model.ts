import { PostInfo, PostLoaderStatus, PostStatus } from 'store/models';

export interface Post {
  postInfo: PostInfo;
  postLoaderStatus: PostLoaderStatus;
  postStatus: PostStatus;
}
