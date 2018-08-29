import { Request, Response, NextFunction } from 'express';
import { isNil } from 'ramda';
import lib from 'src/lib';

const { regex, identification } = lib;

const checkUserInfoMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email } = req.query;

  const identificationValue =
    !isNil(username) && regex.usernameRegex.test(username)
      ? ['username', username]
      : !isNil(email) && regex.emailRegex.test(email)
        ? ['email', email]
        : false;

  identificationValue
    ? identification(identificationValue[0], identificationValue[1])
        .then(data => next())
        .catch((err: Error) =>
          res.status(409).json({
            success: false,
            message: err.message
          })
        )
    : res.status(409).json({
        success: false,
        message: 'User input error !'
      });
};

export { checkUserInfoMiddleware };
