import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { TeamUserJoinModel, setter, TeamUserJoinDocument } from '@common-server';
import { TeamUserJoin } from '@gql/models';

@Service()
export class TeamUserJoinService {
  public async getTeamUserJoins(args: Partial<TeamUserJoin>) {
    return TeamUserJoinModel.find(args).exec();
  }

  public async getTeamUserJoinById(id: ObjectId) {
    return TeamUserJoinModel.findById(id).exec();
  }

  public async getTeamUserJoin(args: Partial<TeamUserJoin>) {
    return TeamUserJoinModel.findOne(args).exec();
  }

  public async createTeamUserJoin(payload: Partial<TeamUserJoin>) {
    const teamUserJoinModel = await new TeamUserJoinModel(payload).save();
    return teamUserJoinModel;
  }

  public async updateTeamUserJoin(teamUserJoin: TeamUserJoinDocument, payload: Partial<TeamUserJoin>) {
    setter<TeamUserJoin>(teamUserJoin, payload);
    return teamUserJoin.save();
  }

  public async deleteTeamUserJoin(teamUserJoin: TeamUserJoinDocument) {
    return teamUserJoin.remove();
  }
}
