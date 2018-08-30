import * as jwt from 'jsonwebtoken';
import { CLIENT_RENEG_WINDOW } from 'tls';

const createJWT = (id: number, username: string, email: string) =>
  jwt.sign(
    {
      id,
      username,
      email
    },
    process.env.JWT_KEY,
    { algorithm: 'HS256', expiresIn: 2628000 * 2, encoding: 'base64' }
  );

interface Decoded {
  id: number;
  username: string;
  email: string;
}
const decodeJWT = (token: string): Promise<any> =>
  new Promise((resolve, reject) =>
    jwt.verify(
      token,
      process.env.JWT_KEY,
      { algorithms: ['HS256'] },
      (err, decoded) => (err ? reject(new Error(err.message)) : resolve(decoded))
    )
  );

export { createJWT, decodeJWT };
