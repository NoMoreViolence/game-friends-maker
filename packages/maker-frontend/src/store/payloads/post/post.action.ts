export interface CreatePostPayload {}

export interface GetPostsPayload {
  gameName?: string;
  offset: number;
}
export interface EmailSubscribeSuccessPayload {
  result: 'success' | 'error';
  msg: string;
}
