import * as jwt from 'jsonwebtoken';

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

export const decodeToken = (token: string): { _id: string } => jwt.verify(token, secret) as { _id: string };
