import { Resolvers } from 'apollo-boost';
import { ApolloCache } from 'apollo-cache';
import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    currentUserTeamId: ID
  }

  extend type Mutation {
    updateCurrentUserTeamId(id: ID!): ID
  }
`;

type ResolverFn = (parent: any, args: any, { cache }: { cache: ApolloCache<any> }) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  // We will update this with our app's resolvers later
}

export const resolvers = {};
