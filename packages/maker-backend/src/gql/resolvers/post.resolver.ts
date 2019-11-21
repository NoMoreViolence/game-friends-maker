import { Authorized, Ctx, Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { UserService, PostService, CommonService } from '@gql/services';
import { Context } from '@gql/bootstrap/session';
import { Post } from '@gql/models';
import {
  CreatePostPayload,
  UpdatePostPayload,
  GetPostsPayload,
  GetPostsOptionPayload,
  GetPostPayload,
  Sort,
} from '@gql/payloads';
import { ObjectId } from 'mongodb';
import { PostController } from '@gql/controllers';

@Service()
@Resolver(type => Post)
export class PostResolver {
  constructor(
    private userService: UserService,
    private postController: PostController,
    private postService: PostService,
    private commonService: CommonService,
  ) {}

  @Authorized()
  @Query(returns => Post)
  public async post(@Ctx() context: Context, @Arg('getPost') getPost: GetPostPayload) {
    const nullablePost = await this.postService.getPost(getPost);
    return this.commonService.nullable(nullablePost);
  }

  @Authorized()
  @Query(returns => [Post])
  public async posts(
    @Ctx() context: Context,
    @Arg('getPost') getPost: GetPostsPayload,
    @Arg('option', { nullable: true }) option?: GetPostsOptionPayload,
  ) {
    const { offsetId, sort = Sort.DESC } = option || {};
    const objectOffsetId = offsetId ? new ObjectId(offsetId) : new ObjectId();

    return (await this.postService.getPosts(getPost, {
      offsetId: objectOffsetId,
      sort,
    })).map(post => post.toObject());
  }

  @Authorized()
  @Mutation(returns => Post)
  public async createPost(@Ctx() context: Context, @Arg('newPost') newPost: CreatePostPayload) {
    const user = await this.userService.getUserByContext(context);
    const post = await this.postService.createPost(user._id, newPost);
    return { ...post.toObject(), authorId: user.toObject() };
  }

  @Authorized()
  @Mutation(returns => Post)
  public async updatePost(
    @Ctx() context: Context,
    @Arg('postId') postId: string,
    @Arg('nextPost') nextPost: UpdatePostPayload,
  ) {
    const user = await this.userService.getUserByContext(context);
    return (await this.postController.updatePost(user, new ObjectId(postId), nextPost)).toObject();
  }

  @Authorized()
  @Mutation(returns => Post)
  public async joinPost(@Ctx() context: Context, @Arg('postId') postId: string) {
    const requestee = await this.userService.getUserByContext(context);
    return (await this.postController.joinPost(requestee, new ObjectId(postId))).toObject();
  }

  @Authorized()
  @Mutation(returns => Post)
  public async deletePost(@Ctx() context: Context, @Arg('postId') postId: string) {
    const user = await this.userService.getUserByContext(context);
    return (await this.postController.deletePost(user, new ObjectId(postId))).toObject();
  }
}
