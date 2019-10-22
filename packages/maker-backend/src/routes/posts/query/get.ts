import { PostModel } from '@common-server';

interface FindPostsPayload {
  offset?: number;
  gameName?: string;
}

export const findPosts = async ({ offset = 0, gameName = '' }: FindPostsPayload) =>
  PostModel.find(
    gameName !== ''
      ? {
          name: { $regex: gameName, $options: 'i' },
        }
      : {},
  )
    .sort('-updatedAt')
    .skip(offset)
    .limit(20)
    .exec();
