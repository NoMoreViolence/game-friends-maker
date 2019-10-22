import crypto from 'crypto';

const secretKey = process.env.KEY_OF_FUCKING_SECRET ? process.env.KEY_OF_FUCKING_SECRET : 'fuck you';

export const encryption = (key: string): string =>
  crypto.pbkdf2Sync(key, secretKey, 113928, 64, 'sha512').toString('base64');
