import { getRestAxios } from '../constants';

export const urlChange = (url: string): string => {
  if (!(url.includes('https://') || url.includes('http://'))) {
    return getRestAxios() + url;
  }
  return url;
};
