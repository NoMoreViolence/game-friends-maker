import ApolloClient, { InMemoryCache, DocumentNode } from 'apollo-boost';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import * as localStateModuleCollection from '../graphqls/local';
import merge from 'lodash/merge';
import apolloCodegenData from '../schema.json';

function getApolloClientUri(): string {
  switch (process.env.REACT_APP_STAGE) {
    case 'dev':
      return 'http://localhost:7000/graphql';
    case 'test':
      return 'https://dev-server.coopnow.net/dev/graphql';
    case 'prod':
      return 'https://prod-server.coopnow.net/prod/graphql';
    default:
      return 'https://prod-server.coopnow.net/prod/graphql';
  }
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: apolloCodegenData,
});
const cache = new InMemoryCache({
  fragmentMatcher,
  cacheRedirects: {},
});
const localStateModules = Object.values(localStateModuleCollection);
const mergedInitialState = merge({}, ...localStateModules.map(localStateModule => localStateModule.initialState));
cache.writeData({
  data: mergedInitialState,
});
const mergedResolvers = merge({}, ...localStateModules.map(localStateModule => localStateModule.resolvers));
export const ApolloMainClient = new ApolloClient({
  uri: getApolloClientUri(),
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  cache,
  typeDefs: localStateModules
    .map(localStateModule => localStateModule.typeDefs)
    .filter((typeDefs): typeDefs is DocumentNode => !!typeDefs),
  resolvers: mergedResolvers,
});
