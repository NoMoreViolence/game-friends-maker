import { Service } from 'typedi';
import { UserModel, DBUser, UserDocument } from '@common-server';
import { Context } from '@gql/bootstrap/session';
import { AuthenticationError, ApolloError } from 'apollo-server-lambda';

@Service()
export class UserService {
  public async getUserById(id: string, autopopulate = true) {
    return UserModel.findById(id, {}, { autopopulate }).exec();
  }

  public async getUser(args: Partial<DBUser>, autopopulate = true) {
    return UserModel.findOne(args, {}, { autopopulate }).exec();
  }

  public async getUsers(args: Partial<DBUser>, autopopulate = true) {
    return UserModel.find(args, {}, { autopopulate }).exec();
  }

  public async getUserByContext(context: Context, autopopulate = true) {
    if (!context.session._id) {
      throw new AuthenticationError('user does not exist');
    }

    const user = await this.getUserById(context.session._id, autopopulate);
    if (!user) {
      throw new AuthenticationError('user does not exist');
    }

    return user;
  }

  public checkUserCanJoinTeam(user: UserDocument) {
    const userMaxTeamLength = user.teams.length + user.relatedTeams.length + user.pendingTeams.length;
    if (userMaxTeamLength >= 5) {
      throw new ApolloError("You can't create because you belong to more than 5 teams");
    }
    return user;
  }
}
