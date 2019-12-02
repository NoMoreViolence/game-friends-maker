import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { TeamModel, TeamDocument, DBTeam, UserModel, setter } from '@common-server';
import { CreateTeamPayload, UpdateTeamPayload, Sort } from '@gql/payloads';

interface GetOption {
  offsetId?: ObjectId;
  sort?: Sort; // DESC
}

@Service()
export class TeamService {
  public async getTeamById(id: ObjectId, autopopulate = true) {
    return TeamModel.findById(id, {}, { autopopulate }).exec();
  }

  public async getTeam(args: Partial<DBTeam>, autopopulate = true) {
    return TeamModel.findOne(args, {}, { autopopulate }).exec();
  }

  public async getTeams(args: Partial<DBTeam>, option: GetOption) {
    const { sort = Sort.DESC, offsetId } = option;

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

  public async createTeam(userId: ObjectId, payload: CreateTeamPayload) {
    const { teamName, gameId, introduction } = payload;
    const teamModel = await new TeamModel({
      authorId: userId,
      name: teamName,
      gameId: new ObjectId(gameId),
      introduction,
    }).save();
    return teamModel;
  }

  public async updateTeam(team: TeamDocument, payload: UpdateTeamPayload) {
    setter(team, payload);
    return team.save();
  }

  public async joinTeam(teamId: ObjectId, userId: ObjectId) {
    await UserModel.findOneAndUpdate({ _id: userId }, { $addToSet: { pendingTeams: teamId } }, { new: true }).exec();
    const updatedTeam = await TeamModel.findOneAndUpdate(
      { _id: teamId },
      { $addToSet: { pendingPeopleIds: userId } },
      { new: true },
    ).exec();
    return updatedTeam;
  }

  public async deleteTeam(team: TeamDocument) {
    /**
     *  포스트에 연결되어 있는 유저들의 ref를 삭제해주어야 할까? 그것들을 Apollo가 해 줄까 ?
     * 내가 삭제 해야만 한다
     */
    return team.remove();
  }
}
