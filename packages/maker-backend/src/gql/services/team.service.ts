import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import {
  TeamModel,
  TeamDocument,
  DBTeam,
  TeamUserJoinModel,
  TeamUserJoinDocument,
  DBTeamUserJoin,
  setter,
} from '@common-server';
import { UpdateTeamPayload, Sort } from '@gql/payloads';

interface GetOption {
  offsetId?: ObjectId;
  sort?: Sort; // DESC
}

@Service()
export class TeamService {
  public async getTeams(args: Partial<DBTeam>, { sort = Sort.DESC, offsetId }: GetOption) {
    const isDesc = sort === Sort.DESC;
    return TeamModel.find({
      ...args,
      _id: {
        [isDesc ? '$lt' : '$gt']: offsetId,
      },
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .exec();
  }

  public async getTeamById(id: ObjectId, autopopulate = true) {
    return TeamModel.findById(id, {}, { autopopulate }).exec();
  }

  public async getTeam(args: Partial<DBTeam>, autopopulate = true) {
    return TeamModel.findOne(args, {}, { autopopulate }).exec();
  }

  public async createTeam(payload: Partial<DBTeam>) {
    const teamModel = await new TeamModel(payload).save();
    return teamModel;
  }

  public async updateTeam(team: TeamDocument, payload: UpdateTeamPayload) {
    setter<DBTeam>(team, payload);
    return team.save();
  }

  public async deleteTeam(team: TeamDocument) {
    return team.remove();
  }

  public async getTeamUserJoins(args: Partial<DBTeamUserJoin>, autopopulate = true) {
    return TeamUserJoinModel.find(args, {}, { autopopulate }).exec();
  }

  public async getTeamUserJoinById(id: ObjectId, autopopulate = true) {
    return TeamUserJoinModel.findById(id, {}, { autopopulate }).exec();
  }

  public async getTeamUserJoin(args: Partial<DBTeamUserJoin>, autopopulate = true) {
    return TeamUserJoinModel.findOne(args, {}, { autopopulate }).exec();
  }

  public async createTeamUserJoin(payload: Partial<DBTeamUserJoin>) {
    const teamUserJoinModel = await new TeamUserJoinModel(payload).save();
    return teamUserJoinModel;
  }

  public async updateTeamUserJoin(teamUserJoin: TeamUserJoinDocument, payload: Partial<DBTeamUserJoin>) {
    setter<DBTeamUserJoin>(teamUserJoin, payload);
    return teamUserJoin.save();
  }

  public async deleteTeamUserJoin(teamUserJoin: TeamUserJoinDocument) {
    return teamUserJoin.remove();
  }
}
