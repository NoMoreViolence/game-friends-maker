import * as jwt from 'jsonwebtoken';
import { User } from 'db';

const createJWT = (id: number, username: string, email: string): Promise<string> =>
  new Promise((resolve, reject) => {
    User.findOne({ where: { id } }).then((data: User) =>
      resolve(
        jwt.sign(
          {
            id,
            username,
            email,
            createdAt: data.updatedOn
          },
          process.env.JWT_KEY,
          {
            algorithm: 'HS512',
            expiresIn: 2628000 * 2,
            issuer: 'Game Friends Maker <Ji-Hoon LEE>'
          }
        )
      )
    );
  });

jwt.sign(
  {
    createdAt: new Date()
  },
  process.env.JWT_KEY,
  {
    algorithm: 'HS512',
    expiresIn: 2628000 * 2,
    issuer: 'Game Friends Maker <Ji-Hoon LEE>'
  }
);

const decodeJWT = (token: string): Promise<string | object> =>
  new Promise((resolve, reject) =>
    jwt.verify(
      token,
      process.env.JWT_KEY,
      { algorithms: ['HS512'] },
      (err: jwt.VerifyErrors, decoded) => (err ? reject(new Error(err.name)) : resolve(decoded))
    )
  );

export { createJWT, decodeJWT };
