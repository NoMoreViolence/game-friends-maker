import { Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Genre } from '@gql/models';

@Service()
@Resolver(of => Genre)
export class GenreResolver {
  constructor() {}
}
