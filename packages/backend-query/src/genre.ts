import { genre as genreConstants } from './constants/target.json';
import { GenreModel } from './common-server';

export class Genre {
  public async create() {
    try {
      const isDuplicate = await GenreModel.find({ name: genreConstants.create.genre }).exec();
      if (isDuplicate.length !== 0) {
        throw new Error('Genre !');
      }

      const generatedGenre = new GenreModel({ name: genreConstants.create.genre });
      const dbGenre = await generatedGenre.save();

      console.log('Success');
      console.log(dbGenre.name);
    } catch (e) {
      console.log('There is an error ^ㅗ^');
    }
  }

  public update() {
    //
  }

  public delete() {
    //
  }
}
