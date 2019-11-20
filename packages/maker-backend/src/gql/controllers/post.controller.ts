import { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { PostDocument, UserDocument, UserModel } from '@common-server';
import { PostService, CommonService } from '@gql/services';
import { AuthenticationError } from 'apollo-server';
import { UpdatePostPayload } from '@gql/payloads';

@Service()
export class PostController {
  constructor(private postService: PostService, private commonService: CommonService) {}

  public async updatePost(user: UserDocument, postId: ObjectId, nextPost: UpdatePostPayload) {
    const nullablePost = await this.postService.getPostById(new ObjectId(postId));
    const post = this.isOwner(user, nullablePost);
    return this.postService.updatePost(post, nextPost);
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
