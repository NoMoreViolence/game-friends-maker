import * as crypto from 'crypto';

interface MakeSalt {
  password: string;
  salt: string;
}
const makeSalt = (password: string): Promise<MakeSalt> => {
  const salt = Math.floor(Math.random() * 1000000 + 1).toString();
  return new Promise((resolve, reject) => {
    return crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err: Error | null, key: Buffer) => {
      return resolve({ password: key.toString('base64'), salt });
    });
  });
};

export { makeSalt, MakeSalt };
