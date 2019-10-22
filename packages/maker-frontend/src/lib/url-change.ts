import { detectEnvironment } from '@src/constants';

export const urlChange = (url: string): string => {
  if (!(url.includes('https://') || url.includes('http://'))) {
    return detectEnvironment() + url;
  }
  return url;
};
