import { ENV } from 'constants/ENV';
import * as jwt from 'jsonwebtoken';

export interface Decoded {
  algorithm: string;
  data: { _id: string };
  iat: number;
}

export const encodeToken = (_id: string): string =>
  jwt.sign(
    {
      algorithm: 'HS512',
      data: {
        _id,
      },
    },
    ENV.JWT_SECRET_KEY,
  );

export const decodeToken = (token: string): Decoded =>
  jwt.verify(token, ENV.JWT_SECRET_KEY) as Decoded;
