import { game as gameConstants } from './constants/target.json';
import { GenreModel, GameModel } from './common-server';

export class Game {
  public async create() {
    try {
      const isDuplicate = await GameModel.find({ name: gameConstants.create.gameName }).exec();
      if (isDuplicate.length !== 0) {
        throw new Error('Game !');
      }

      const isNotDuplicateGenres = (w: string[]): boolean => new Set(w).size !== w.length;
      if (isNotDuplicateGenres(gameConstants.create.genre)) {
        throw new Error('Genre !');
      }

      const genreExist = await Promise.all(
        gameConstants.create.genre.map(async genreName => await GenreModel.find({ name: genreName }).exec()),
      );
      if (genreExist.filter(genre => genre.length !== 0).length !== gameConstants.create.genre.length) {
        throw new Error('Genre !');
      }

      const genreIds = genreExist.map(genre => genre[0]._id.toString());
      const generatedGame = new GameModel({ name: gameConstants.create.gameName, genres: genreIds });
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
