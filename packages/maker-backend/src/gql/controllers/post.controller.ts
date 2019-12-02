import { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { PostDocument, UserDocument, UserModel } from '@common-server';
import { PostService, CommonService, UserService } from '@gql/services';
import { AuthenticationError, ApolloError } from 'apollo-server';
import { UpdatePostPayload, CreatePostPayload } from '@gql/payloads';

@Service()
export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService,
    private commonService: CommonService,
  ) {}

  public async createPost(user: UserDocument, payload: CreatePostPayload) {
    this.userService.checkUserCanJoinPost(user);
    const post = await this.postService.createPost(user._id, payload);
    await UserModel.findOneAndUpdate({ _id: user._id }, { $addToSet: { posts: post._id } }, { new: true }).exec();
    return post;
  }

  public async updatePost(user: UserDocument, postId: ObjectId, nextPost: UpdatePostPayload) {
    const nullablePost = await this.postService.getPostById(new ObjectId(postId), false);
    const post = this.isOwner(user, nullablePost);
    return this.postService.updatePost(post, nextPost);
  }

  public async joinPost(requestee: UserDocument, postId: ObjectId) {
    this.userService.checkUserCanJoinPost(requestee);
    const post = await this.postService.getPostById(postId, false);
    if (!post) {
      throw new ApolloError('There is no data');
    }
    if (post.authorId.equals(requestee._id)) {
      throw new AuthenticationError('You cannot join this party');
    }

    return this.postService.joinPost(postId, requestee._id);
  }

  public async deletePost(user: UserDocument, postId: ObjectId) {
    const nullablePost = await this.postService.getPostById(new ObjectId(postId), false);
    const post = this.isOwner(user, nullablePost);
    return this.postService.deletePost(post);
  }

  private isOwner(user: UserDocument, nullablePost: PostDocument | null) {
    const post = this.commonService.nullable<PostDocument>(nullablePost);
    if (!post.authorId.equals(user._id)) {
      throw new AuthenticationError('You are not owner of this post');
    }
    return post;
  }
}
