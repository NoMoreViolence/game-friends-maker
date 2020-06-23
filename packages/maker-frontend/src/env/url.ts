export const getBackendUrl = (): string => {
  switch (process.env.REACT_APP_STAGE) {
    case 'dev':
      return 'http://localhost:7000/local';
    case 'test':
      return 'https://staging-backend.cohope.io';
    case 'prod':
      return 'https://backend.cohope.io';
    default:
      return 'https://backend.cohope.io';
  }
};
