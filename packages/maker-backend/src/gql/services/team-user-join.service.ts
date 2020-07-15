import { setter, UserTeamJoinDocument, UserTeamJoinModel } from '@common-server';
import { UserTeamJoin } from '@gql/models';
import { ObjectId } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class TeamUserJoinService {
  public async getTeamUserJoins(args: Partial<UserTeamJoin>) {
    return UserTeamJoinModel.find(args).exec();
  }

  public async getTeamUserJoinById(id: ObjectId) {
    return UserTeamJoinModel.findById(id).exec();
  }

  public async getTeamUserJoin(args: Partial<UserTeamJoin>) {
    return UserTeamJoinModel.findOne(args).exec();
  }

  public async createTeamUserJoin(payload: Partial<UserTeamJoin>) {
    const teamUserJoinModel = await new UserTeamJoinModel(payload).save();
    return teamUserJoinModel;
  }

  public async updateTeamUserJoin(userTeamJoin: UserTeamJoinDocument, payload: Partial<UserTeamJoin>) {
    setter<UserTeamJoin>(userTeamJoin, payload);
    return userTeamJoin.save();
  }

  public async deleteTeamUserJoin(userTeamJoin: UserTeamJoinDocument) {
    return userTeamJoin.remove();
  }
}
