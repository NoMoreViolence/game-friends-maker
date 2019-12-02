import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { PostModel, PostDocument, DBPost, UserModel, setter } from '@common-server';
import { CreatePostPayload, UpdatePostPayload, Sort } from '@gql/payloads';

interface GetOption {
  offsetId?: ObjectId;
  sort?: Sort; // DESC
}

@Service()
export class PostService {
  public async getPostById(id: ObjectId, autopopulate = true) {
    return PostModel.findById(id, {}, { autopopulate }).exec();
  }

  public async getPost(args: Partial<DBPost>, autopopulate = true) {
    return PostModel.findOne(args, {}, { autopopulate }).exec();
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
    return postModel;
  }

  public async updatePost(post: PostDocument, payload: UpdatePostPayload) {
    setter(post, payload);
    return post.save();
  }

  public async joinPost(postId: ObjectId, userId: ObjectId) {
    await UserModel.findOneAndUpdate({ _id: userId }, { $addToSet: { pendingTeams: postId } }, { new: true }).exec();
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { pendingPeopleIds: userId } },
      { new: true },
    ).exec();
    return updatedPost;
  }

  public async deletePost(post: PostDocument) {
    /**
     *  포스트에 연결되어 있는 유저들의 ref를 삭제해주어야 할까? 그것들을 Apollo가 해 줄까 ?
     * 내가 삭제 해야만 한다
     */
    return post.remove();
  }
}
