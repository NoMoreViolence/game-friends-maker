import { getBackendUrl } from 'env';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: getBackendUrl(),
  validateStatus: (status) => status < 500,
  headers: {
    'Content-Type': 'application/json',
  },
});
