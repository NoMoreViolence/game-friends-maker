import axios, { AxiosInstance } from 'axios';

export const devServerUrl = 'http://localhost:3001';
export const serverUrl = 'FuckingUrl';

export const detectEnvironment = (): AxiosInstance => {
  const url = new URL(document.URL);

  if (url.host.includes('localhost')) {
    return axios.create({ baseURL: devServerUrl });
  } else {
    return axios.create({ baseURL: devServerUrl });
  }
};
