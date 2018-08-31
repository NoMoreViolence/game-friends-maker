import * as jwt from 'jsonwebtoken';

const createJWT = (id: number, username: string, email: string) =>
  jwt.sign(
    {
      id,
      username,
      email
    },
    process.env.JWT_KEY,
    { algorithm: 'HS512', expiresIn: 2628000 * 2, issuer: 'GameFriendsMaker<Ji-Hoon LEE>' }
  );

interface Decoded {
  id: number;
  username: string;
  email: string;
  iat: number;
  exp: number;
  iss: string;
}
const decodeJWT = (token: string): Promise<Decoded> =>
  new Promise((resolve, reject) =>
    jwt.verify(
      token,
      process.env.JWT_KEY,
      { algorithms: ['HS512'] },
      (err, decoded) => (err ? reject(new Error(err.name)) : resolve(decoded))
    )
  );

export { createJWT, decodeJWT };
