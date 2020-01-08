import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { GameModel } from '@common-server';
import { Game } from '@gql/models';

@Service()
export class GameService {
  public async getGameById(id: ObjectId) {
    return GameModel.findById(id).exec();
  }

  public async getGame(args: Partial<Game>) {
    return GameModel.findOne(args).exec();
  }
}
