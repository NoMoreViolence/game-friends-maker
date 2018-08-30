import * as crypto from 'crypto';

interface EncryptoPassword {
  password: string;
  salt: string;
}
// encrypt password, and return object<EncryptoPassword>
const encryptoPassword = (value: EncryptoPassword): Promise<EncryptoPassword> =>
  new Promise((resolve, reject) =>
    crypto.pbkdf2(value.password, value.salt, 100000, 64, 'sha512', (err: Error, key: Buffer) =>
      resolve({ password: key.toString('base64'), salt: value.salt })
    )
  );

export { encryptoPassword, EncryptoPassword };
