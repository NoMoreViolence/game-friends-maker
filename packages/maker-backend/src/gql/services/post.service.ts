import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { PostModel, PostDocument, DBPost, UserModel } from '@common-server';
import { CreatePostPayload, UpdatePostPayload, Sort } from '@gql/payloads';
import { setter } from '@common-server/utils';

interface GetOption {
  offsetId?: ObjectId;
  sort?: Sort; // desc
}

@Service()
export class PostService {
  public async getPostById(id: ObjectId) {
    return PostModel.findById(id).exec();
  }

  public async getPost(args: Partial<DBPost>) {
    return PostModel.findOne(args).exec();
  }

  public async getPosts(args: Partial<DBPost>, option: GetOption) {
    const { sort = Sort.DESC, offsetId } = option;

    const isDesc = sort === Sort.DESC;
    return PostModel.find({
      ...args,
      _id: {
        [isDesc ? '$lt' : '$gt']: offsetId,
      },
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .exec();
  }

  public async createPost(userId: ObjectId, payload: CreatePostPayload) {
    const { postName, gameId, introduction } = payload;

    const postModel = await new PostModel({
      authorId: userId,
      name: postName,
      gameId: new ObjectId(gameId),
      introduction,
    }).save();
    await UserModel.findOneAndUpdate({ _id: userId }, { $addToSet: { posts: postModel._id } }, { new: true }).exec();
    return postModel;
  }

  public async updatePost(post: PostDocument, payload: UpdatePostPayload) {
    setter(post, payload);
    return post.save();
  }

  public async joinPost(postId: ObjectId, userId: ObjectId) {
    return PostModel.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { relatedPeopleIds: userId } },
      { new: true },
    ).exec();
  }

  public async deletePost(post: PostDocument) {
    return post.remove();
  }
}
