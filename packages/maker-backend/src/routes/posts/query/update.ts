import { PostModel } from '@common-server';
import { ObjectId } from 'mongodb';

interface UpdatePost {
  postId: ObjectId | string;
  gameId?: ObjectId | string;
  postName?: string;
  introduction?: string;
}

export const getPostIdAndUpdate = async ({ postId, ...props }: UpdatePost) => {
  return PostModel.findByIdAndUpdate(postId, props, { new: true }).exec();
};
