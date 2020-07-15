import { UserModel } from '@common-server';
import { Context } from '@gql/bootstrap/session';
import { User } from '@gql/models';
import { AuthenticationError } from 'apollo-server-lambda';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class UserService {
  public async getUserById(id: ObjectId) {
    return UserModel.findById(id).exec();
  }

  public async getUser(args: Partial<User>) {
    return UserModel.findOne(args).exec();
  }

  public async getUsers(args: Partial<User>) {
    return UserModel.find(args).exec();
  }

  public async getUserByContext(context: Context) {
    if (!context.session._id) {
      throw new AuthenticationError('user does not exist');
    }

    const user = await this.getUserById(new ObjectId(context.session._id));
    if (!user) {
      throw new AuthenticationError('user does not exist');
    }

    return user;
  }
}
