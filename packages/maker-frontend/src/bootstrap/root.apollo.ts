import ApolloClient, { InMemoryCache } from 'apollo-boost';

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
  cache: new InMemoryCache(),
});
