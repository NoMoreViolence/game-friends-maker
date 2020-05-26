import ApolloClient, { DocumentNode, InMemoryCache } from 'apollo-boost';
import { IntrospectionFragmentMatcher, IntrospectionResultData } from 'apollo-cache-inmemory';
import merge from 'lodash/merge';
import * as localStateModuleCollection from '../graphqls/local';
import apolloCodegenData from '../schema.json';

function getApolloClientUri(): string {
  switch (process.env.REACT_APP_STAGE) {
    case 'dev':
      return 'http://localhost:7000/local/graphql';
    case 'test':
      return 'https://staging-backend.cohope.io/graphql';
    case 'prod':
      return 'https://backend.cohope.io/graphql';
    default:
      return 'https://backend.cohope.io/graphql';
  }
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: (apolloCodegenData as unknown) as IntrospectionResultData,
});
const cache = new InMemoryCache({
  fragmentMatcher,
  cacheRedirects: {},
});
const localStateModules = Object.values(localStateModuleCollection);
const mergedInitialState = merge({}, ...localStateModules.map((localStateModule) => localStateModule.initialState));
cache.writeData({
  data: mergedInitialState,
});
const mergedResolvers = merge({}, ...localStateModules.map((localStateModule) => localStateModule.resolvers));
export const ApolloMainClient = new ApolloClient({
  uri: getApolloClientUri(),
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  cache,
  typeDefs: localStateModules
    .map((localStateModule) => localStateModule.typeDefs)
    .filter((typeDefs): typeDefs is DocumentNode => !!typeDefs),
  resolvers: mergedResolvers,
});
