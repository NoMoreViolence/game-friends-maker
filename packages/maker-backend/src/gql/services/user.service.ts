import { Service } from 'typedi';
import { UserModel, IUser } from '@common-server';
import { Context } from '@gql/bootstrap/session';
import { AuthenticationError } from 'apollo-server-lambda';

@Service()
export class UserService {
  public async getUserById(id: string) {
    return UserModel.findById(id).exec();
  }

  public async getUser(args: Partial<IUser>) {
    return UserModel.findOne(args).exec();
  }

  public async getUsers(args: Partial<IUser>) {
    return UserModel.find(args).exec();
  }

  public async getUserByContext(context: Context) {
    if (!context.session._id) {
      throw new AuthenticationError('user does not exist');
    }

    const user = await this.getUserById(context.session._id);
    if (!user) {
      throw new AuthenticationError('user does not exist');
    }

    return user;
  }
}
