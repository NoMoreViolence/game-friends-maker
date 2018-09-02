import { Request, Response, NextFunction } from 'express';
import lib from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';
const { jwt } = lib;

interface Cookie {
  token: string;
}
const checkCookie = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  // Check token is exist
  const checkExistCookie = (cookie: Cookie): Promise<Cookie> =>
    cookie ? Promise.resolve(cookie) : Promise.reject(new Error('No cookie'));

  // Verify token
  const verifyToken = (cookie: Cookie): Promise<string | object> =>
    new Promise((resolve, reject) =>
      jwt
        .decodeJWT(cookie.token)
        .then(data => resolve(data))
        .catch((err: JsonWebTokenError) => reject(new Error(err.name)))
    );

  // Next function: token verify sucess
  const nextTo = (value: string | object): void => {
    req.body = { ...req.body, tokenValue: value };
    next();
  };

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
  checkExistCookie(accessToken)
    .then(verifyToken)
    .then(nextTo)
    .catch(onError);
};

export { checkCookie };
