import { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { PostDocument, UserDocument, UserModel, PostModel } from '@common-server';
import { PostService, CommonService } from '@gql/services';
import { AuthenticationError, ApolloError } from 'apollo-server';
import { UpdatePostPayload } from '@gql/payloads';

@Service()
export class PostController {
  constructor(private postService: PostService, private commonService: CommonService) {}

  public async updatePost(user: UserDocument, postId: ObjectId, nextPost: UpdatePostPayload) {
    const nullablePost = await this.postService.getPostById(new ObjectId(postId));
    const post = this.isOwner(user, nullablePost);
    return this.postService.updatePost(post, nextPost);
  }

  public async joinPost(requestee: UserDocument, postId: ObjectId) {
    const post = await this.postService.getPostById(postId);
    if (!post) {
      throw new ApolloError('There is no data');
    }
    if (post.authorId instanceof UserModel && post.authorId._id.equals(requestee._id)) {
      throw new AuthenticationError('You cannot join this party');
    }

    return this.postService.joinPost(postId, requestee._id) as Promise<PostDocument>;
  }

  public async deletePost(user: UserDocument, postId: ObjectId) {
    const nullablePost = await this.postService.getPostById(new ObjectId(postId));
    const post = this.isOwner(user, nullablePost);
    return this.postService.deletePost(post);
  }

  private isOwner(user: UserDocument, nullablePost: PostDocument | null) {
    const post = this.commonService.nullable<PostDocument>(nullablePost);
    if (post.authorId instanceof UserModel && !post.authorId._id.equals(user._id)) {
      throw new AuthenticationError('You are not owner of this post');
    }
    return post;
  }
}
