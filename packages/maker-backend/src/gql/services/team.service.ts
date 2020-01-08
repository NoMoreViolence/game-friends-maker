import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { TeamModel, TeamDocument, setter } from '@common-server';
import { UpdateTeamPayload, Sort } from '@gql/payloads';
import { Team } from '@gql/models';

interface GetOption {
  offsetId?: ObjectId;
  sort?: Sort; // DESC
}

@Service()
export class TeamService {
  public async getTeams(args: Partial<Team>, { sort = Sort.DESC, offsetId }: GetOption) {
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

  public async getTeamById(id: ObjectId) {
    return TeamModel.findById(id).exec();
  }

  public async getTeam(args: Partial<Team>) {
    return TeamModel.findOne(args).exec();
  }

  public async createTeam(payload: Partial<Team>) {
    const teamModel = await new TeamModel(payload).save();
    return teamModel;
  }

  public async updateTeam(team: TeamDocument, payload: UpdateTeamPayload) {
    setter<Team>(team, payload);
    return team.save();
  }

  public async deleteTeam(team: TeamDocument) {
    return team.remove();
  }
}
