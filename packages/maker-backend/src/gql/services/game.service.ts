import { Service } from 'typedi';
import { GameModel, DBGame } from '@common-server';

@Service()
export class GameService {
  public async getGameById(id: string, autopopulate = true) {
    return GameModel.findById(id, {}, { autopopulate }).exec();
  }

  public async getGame(args: Partial<DBGame>, autopopulate = true) {
    return GameModel.findOne(args, {}, { autopopulate }).exec();
  }
}
