import { Request, Response, NextFunction } from 'express';
import lib from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';
import { User } from 'db';
import { DatabaseError } from 'sequelize';
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
  const verifyToken = (cookie: Cookie): Promise<any> =>
    new Promise((resolve, reject) =>
      jwt
        .decodeJWT(cookie.token)
        .then(data => resolve(data))
        .catch((err: JsonWebTokenError) => reject(new Error(err.name)))
    );

  // Check token validity
  const checkDate = (value: any): Promise<any> =>
    new Promise((resolve, reject) =>
      User.findOne({ where: { id: value.id } })
        .then((data: User) => {
          const newData = new Date(value.createdAt);
          data.id
            ? data.dataValues.updatedOn <= newData
              ? resolve(value)
              : reject(new Error('There is a validity error !'))
            : reject(new Error('There is no user !'));
        })
        .catch((err: DatabaseError) => reject(new Error('There is a database error !')))
    );

  // Next function: token verify sucess
  const nextTo = (value: any): void => {
    res.locals = value;
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
    .then(checkDate)
    .then(nextTo)
    .catch(onError);
};

export { checkCookie };
