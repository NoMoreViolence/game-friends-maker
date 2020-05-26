import axios, { AxiosInstance } from 'axios';

const localServerUrl = 'http://localhost:7000/local';
const testServerUrl = 'https://staging-backend.cohope.io';
const prodServerUrl = 'https://prod-server.coopnow.net/prod';

export const getRestAxios = (): AxiosInstance => {
  const url = new URL(document.URL);

  if (url.host.includes('localhost') || url.host.includes('127.0.0.1')) {
    return axios.create({ baseURL: localServerUrl });
  } else if (url.host === 'staging.cohope.io') {
    return axios.create({ baseURL: testServerUrl });
  } else if (url.host === 'cohope.io') {
    return axios.create({ baseURL: prodServerUrl });
  } else {
    return axios.create({ baseURL: localServerUrl });
  }
};
