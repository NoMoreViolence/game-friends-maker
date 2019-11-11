import axios, { AxiosInstance } from 'axios';

export const localServerUrl = 'http://localhost:3001';
export const devServerUrl = 'https://dev-server.coopnow.net/dev';
export const prodServerUrl = 'https://prod-server.coopnow.net/prod';

export const detectEnvironment = (): AxiosInstance => {
  const url = new URL(document.URL);

  if (url.host.includes('localhost') || url.host.includes('127.0.0.1')) {
    return axios.create({ baseURL: localServerUrl });
  } else if (url.host === 'coopnow.net') {
    return axios.create({ baseURL: devServerUrl });
  } else if (url.host === 'cohope.io') {
    return axios.create({ baseURL: prodServerUrl });
  } else {
    return axios.create({ baseURL: localServerUrl });
  }
};
