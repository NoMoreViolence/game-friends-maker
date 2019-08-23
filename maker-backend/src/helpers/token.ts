import * as jwt from 'jsonwebtoken';

export interface Decoded {
  algorithm: string;
  data: { _id: string };
  iat: number;
}

const secret = process.env.KEY_OF_FUCKING_SECRET ? process.env.KEY_OF_FUCKING_SECRET : 'secretKey';

export const encodeToken = (_id: string): string =>
  jwt.sign(
    {
      algorithm: 'HS512',
      data: {
        _id,
      },
    },
    secret,
  );

export const decodeToken = (token: string): Decoded => jwt.verify(token, secret) as Decoded;
