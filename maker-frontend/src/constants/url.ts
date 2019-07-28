import axios, { AxiosInstance } from 'axios';

export const devServerUrl = 'http://localhost:3001';
export const serverUrl = 'FuckingUrl';

export const detectEnvironment = (): AxiosInstance => {
  if (process.env.NODE_ENV === 'development') {
    return axios.create({ baseURL: devServerUrl });
  }
  return axios.create({ baseURL: serverUrl });
};
