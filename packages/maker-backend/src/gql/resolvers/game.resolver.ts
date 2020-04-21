import { Authorized, Resolver, FieldResolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { Game, Genre } from '@gql/models';
import { GenreService } from '@gql/services';

@Service()
@Resolver((of) => Game)
export class GameResolver {
  constructor(private genreService: GenreService) {}

  @Authorized()
  @FieldResolver((type) => [Genre])
  async genres(@Root() game: Game) {
    const genres = await this.genreService.getGenresByIds(game.genreIds);
    return genres.map((genre) => genre.toObject());
  }
}
