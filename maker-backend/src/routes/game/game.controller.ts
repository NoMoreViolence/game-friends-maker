import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import { FilteredModelAttributes } from 'sequelize-typescript/lib/models/Model';
import Sequelize, { User, UserGame, AllGame } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

/* GET
*/
export const getAllGame = (req: Request, res: Response): void => {
  const findAllGame = (): Promise<Array<FilteredModelAttributes<AllGame>>> =>
    new Promise((resolve, reject) =>
      AllGame.findAll({ attributes: ['id', 'gamename', 'window', 'mac', 'ps', 'xbox', 'nswitch', 'android', 'ios'] })
        .then(games => resolve(games.map(game => game.dataValues)))
        .catch((err: DatabaseError) => reject(new Error(err.name)))
    );

  const responseToClient = (value: Array<FilteredModelAttributes<AllGame>>): Response =>
    res.json({
      success: true,
      message: 'DoubleCheck success !',
      value
    });

  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  findAllGame()
    .then(responseToClient)
    .catch(onError);
};
