import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from 'sequelize';
import { User } from 'db';
import { JsonWebTokenError } from 'jsonwebtoken';
import lib from 'src/lib';
const { jwt } = lib;

interface Cookie {
  token: string;
}
interface JWT {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}
const checkUserCookie = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  // Check token is exist
  const checkCookieExist = (cookie: Cookie): Promise<Cookie> => (cookie ? Promise.resolve(cookie) : Promise.reject(new Error('No cookie')));

  // Verify token
  const verifyToken = (cookie: Cookie): Promise<any> =>
    new Promise((resolve, reject) =>
      jwt
        .decodeJWT(cookie.token)
        .then(data => resolve(data))
        .catch((err: JsonWebTokenError) => reject(new Error(err.name)))
    );

  // Check token validity
  const checkDate = (token: JWT): Promise<JWT> =>
    new Promise((resolve, reject) =>
      User.findOne({ where: { id: token.id } })
        .then((data: User) => {
          const newData = new Date(token.createdAt);
          data.id
            ? data.dataValues.updatedAt <= newData
              ? resolve(token)
              : reject(new Error('There is a validity error !'))
            : reject(new Error('There is no user !'));
        })
        .catch((err: DatabaseError) => reject(new Error('There is a database error !')))
    );

  // Next function: token verify sucess
  const nextTo = (token: JWT): void => {
    res.locals = token;
    next();
  };

  // Error handler
  const onError = (err: Error): Response =>
    res.status(401).json({
      success: false,
      message: err.message
    });

  // Promise
  checkCookieExist(accessToken)
    .then(verifyToken)
    .then(checkDate)
    .then(nextTo)
    .catch(onError);
};

export { checkUserCookie };
