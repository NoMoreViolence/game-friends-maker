import { TeamUserJoinModel, TeamModel } from './common-server';

export class Clean {
  public async deleteTeamAndTeamUserJoin() {
    await TeamUserJoinModel.deleteMany({});
    await TeamModel.deleteMany({});
    console.log('clean complete');
  }

  public cleanAll() {
    //
  }

  public delete() {
    //
  }
}
