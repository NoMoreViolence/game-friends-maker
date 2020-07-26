import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { IntrospectionFragmentMatcher, IntrospectionResultData } from 'apollo-cache-inmemory';
import { CONSTANTS } from 'env';
import { resolvers, typeDefs } from 'graphql/local';
import apolloCodegenData from '../schema.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: (apolloCodegenData as unknown) as IntrospectionResultData,
});
const cache = new InMemoryCache({
  fragmentMatcher,
  cacheRedirects: {},
});

export const apolloClient = new ApolloClient({
  uri: CONSTANTS.URLS.CLIENT_URL,
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  cache,
  typeDefs,
  resolvers,
});

const token = localStorage.getItem('token');
cache.writeData({
  data: {
    isLoggedIn: !!token,
    currentUserTeamId: token ? localStorage.getItem(`${token}:currentTeamId`) : null,
  },
});
