import { CONSTANTS } from 'env';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: CONSTANTS.URLS.BACKEND_URL,
  validateStatus: (status) => status < 500,
  headers: {
    'Content-Type': 'application/json',
  },
});
