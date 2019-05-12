export const devServerUrl = 'http://localhost:3001';
export const serverUrl = 'FuckingUrl';

export const detectEnvironment = () => {
  if (process.env.NODE_ENV === 'development') {
    return devServerUrl;
  }
  return serverUrl;
};
