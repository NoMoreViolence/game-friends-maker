import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { UserService } from '@gql/services';
import { User } from '@gql/models/user';
import { Context } from '@gql/bootstrap/session';

@Service()
@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Authorized()
  @Query(returns => User)
  public async user(@Ctx() context: Context) {
    return this.userService.getUserByContext(context);
  }
}
