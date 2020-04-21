import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { IntrospectionFragmentMatcher, IntrospectionResultData } from 'apollo-cache-inmemory';
import apolloCodegenData from '../schema.json';

function getApolloClientUri(): string {
  switch (process.env.REACT_APP_STAGE) {
    case 'dev':
      return 'http://localhost:7000/local/graphql';
    case 'test':
      return 'https://dev-server.coopnow.net/dev/graphql';
    case 'prod':
      return 'https://prod-server.coopnow.net/prod/graphql';
    default:
      return 'https://prod-server.coopnow.net/prod/graphql';
  }
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: (apolloCodegenData as unknown) as IntrospectionResultData,
});
const cache = new InMemoryCache({
  fragmentMatcher,
  cacheRedirects: {},
});
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
});
