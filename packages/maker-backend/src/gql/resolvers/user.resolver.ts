import { Context } from '@gql/bootstrap/session';
import { User } from '@gql/models/user';
import { UserService } from '@gql/services';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Authorized()
  @Query(() => User)
  public async user(@Ctx() context: Context) {
    const user = await this.userService.getUserByContext(context);
    return user.toObject();
  }
}
