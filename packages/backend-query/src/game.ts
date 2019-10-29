import { gameConstants } from './constants';
import { GameModel, GenreModel } from './common-server/db/models';

export class Game {
  public async create() {
    try {
      const isDuplicate = await GameModel.find({ name: gameConstants.create.gameName }).exec();
      if (isDuplicate.length !== 0) {
        throw new Error('Game !');
      }

      const isDuplicateGenres = (w: string[]): boolean => !(new Set(w).size !== w.length);
      if (isDuplicateGenres(gameConstants.create.genre)) {
        throw new Error('Genre !');
      }

      const genreExist = await Promise.all(
        gameConstants.create.genre.map(async genreName => await GenreModel.find({ name: genreName }).exec()),
      );
      if (genreExist.filter(genre => genre.length !== 0).length !== gameConstants.create.genre.length) {
        throw new Error('Genre !');
      }

      const genreIds = genreExist.map(genre => genre[0]._id);
      const generatedGame = new GameModel({ name: gameConstants.create.gameName, genres: [genreIds] });
      const dbGame = await generatedGame.save();

      console.log('Success');
      console.log(dbGame.name, dbGame.genres);
    } catch (e) {
      console.log('There is an error ^ㅗ^');
    }
  }

  public update() {
    // gameConstants.update
  }

  public delete() {
    // gameConstants.delete
  }
}
