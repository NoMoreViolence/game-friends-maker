import { Resolvers } from 'apollo-client';
import { DocumentNode } from 'graphql';

export interface LocalStateModule<T> {
  typeDefs?: DocumentNode;
  initialState?: T;
  resolvers?: Resolvers;
}
