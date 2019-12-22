import { genre as genreConstants } from './constants/target.json';
import { GenreModel } from './common-server';

export class Genre {
  public async create() {
    try {
      genreConstants.create.genre.map(async genre => {
        const isDuplicate = await GenreModel.find({ name: genre }).exec();
        if (isDuplicate.length !== 0) {
          throw new Error('Genre !');
        }

        const generatedGenre = new GenreModel({ name: genre });
        const dbGenre = await generatedGenre.save();

        console.log('Success');
        console.log(dbGenre.name);
      });
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
