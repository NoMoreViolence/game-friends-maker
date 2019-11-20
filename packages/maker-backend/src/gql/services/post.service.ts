import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { PostModel, IPost, PostDocument } from '@common-server';
import { CreatePostPayload, UpdatePostPayload, Sort } from '@gql/payloads';
import { setter } from '@common-server/utils';
import { CommonService } from './common.service';

interface GetOption {
  offsetId?: ObjectId;
  sort?: Sort; // desc
}

@Service()
export class PostService {
  constructor(private commonService: CommonService) {}

  public async getPostById(id: ObjectId) {
    return PostModel.findById(id).exec();
  }

  public async getPost(args: Partial<IPost>) {
    return PostModel.findOne(args).exec();
  }

  public async getPosts(args: Partial<IPost>, option: GetOption) {
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

    return new PostModel({
      authorId: userId,
      name: postName,
      gameId: new ObjectId(gameId),
      introduction,
    }).save();
  }

  public async updatePost(post: PostDocument, payload: UpdatePostPayload) {
    setter(post, payload);
    return post.save();
  }

  public async deletePost(post: PostDocument) {
    return post.remove();
  }
}
