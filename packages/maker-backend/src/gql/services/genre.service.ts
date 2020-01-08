import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { GenreModel } from '@common-server';
import { Genre } from '@gql/models';

@Service()
export class GenreService {
  public async getGenreById(id: ObjectId) {
    return GenreModel.findById(id).exec();
  }

  public async getGenresByIds(ids: ObjectId[]) {
    return GenreModel.find({ _id: { $in: ids } }).exec();
  }

  public async getGenre(args: Partial<Genre>) {
    return GenreModel.findOne(args).exec();
  }
}
