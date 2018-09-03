import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword } from 'src/lib';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

export const changeUsername = (req: Request, res: Response) => {
  const { willChange } = req.body;

  const onError = (err: Error) => {
    res.status(409).json({
      success: false,
      message: err.message
    });
  };
};
