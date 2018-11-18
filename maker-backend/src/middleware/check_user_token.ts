import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from 'sequelize';
import { User } from 'db';
import { JsonWebTokenError } from 'jsonwebtoken';
import lib from 'src/lib';
const { jwt } = lib;

interface JWT {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}
const checkUserToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  // Check token is exist
  const checkTokenExist = (token: string): Promise<string> => (token ? Promise.resolve(token) : Promise.reject(new Error('No Token')));

  const pickUpToken = (token: string): Promise<string> => {
    const bearerToken = token.split(' ');

    return bearerToken[0] === 'Bearer' && bearerToken[1] !== ''
      ? Promise.resolve(bearerToken[0])
      : Promise.reject(new Error('Not Bearer token'));
  };

  // Verify token
  const verifyToken = (token: string): Promise<any> =>
    new Promise((resolve, reject) =>
      jwt
        .decodeJWT(token)
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
  checkTokenExist(authorization)
    .then(pickUpToken)
    .then(verifyToken)
    .then(checkDate)
    .then(nextTo)
    .catch(onError);
};

export { checkUserToken };
