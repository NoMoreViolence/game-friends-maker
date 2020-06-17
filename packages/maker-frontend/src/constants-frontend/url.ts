import axios from 'axios';

const localServerUrl = 'http://localhost:7000/local';
const testServerUrl = 'https://staging-backend.cohope.io';
const prodServerUrl = 'https://backend.cohope.io';

const getBackendUrl = (): string => {
  const url = new URL(document.URL);

  if (url.host.includes('localhost') || url.host.includes('127.0.0.1')) {
    return localServerUrl;
  } else if (url.host === 'staging.cohope.io') {
    return testServerUrl;
  } else if (url.host === 'cohope.io') {
    return prodServerUrl;
  } else {
    return localServerUrl;
  }
};

export const httpClient = axios.create({
  baseURL: getBackendUrl(),
  validateStatus: (status) => status < 500,
  headers: {
    'Content-Type': 'application/json',
  },
});
