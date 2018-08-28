import { Request, Response, NextFunction } from 'express';
import { User } from 'db/models';
import { DatabaseError } from 'sequelize';

const usernameMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { username } = req.query;

  User.findOne({ where: { username } })
    .then(
      (data: User) =>
        data
          ? res.status(409).json({
              success: false,
              message: 'Duplicate Username !'
            })
          : next()
    )
    .catch((err: DatabaseError) =>
      res.status(409).json({
        success: false,
        message: 'Server Error !'
      })
    );
};

export { usernameMiddleware };
