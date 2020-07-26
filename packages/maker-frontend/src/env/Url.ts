const { REACT_APP_STAGE } = process.env;

export const CLIENT_URL =
  REACT_APP_STAGE === 'dev'
    ? 'http://localhost:7000'
    : REACT_APP_STAGE === 'test'
    ? 'https://staging-backend.cohope.io/graphql'
    : 'https://backend.cohope.io/graphql';

export const BACKEND_URL =
  REACT_APP_STAGE === 'dev'
    ? 'http://localhost:7000/local'
    : REACT_APP_STAGE === 'test'
    ? 'https://staging-backend.cohope.io'
    : 'https://backend.cohope.io';
