import { ApolloError } from 'apollo-server';
import { Service } from 'typedi';

@Service()
export class CommonService {
  public nullable<T>(document: T | null): T {
    if (!document) {
      throw new ApolloError('There is no data');
    }

    return document;
  }
}
