import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User, Game, AllGame } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

interface AddGame {
  id: string;
  gamename: string;
  genre: string;
  window: boolean;
  mac: boolean;
  ps: boolean;
  nswitch: boolean;
}
export const addGame = (req: Request, res: Response) => {
  const { id } = res.locals;
  const { gamename } = req.params;
  const { genre, window, mac, xbox, ps, nswitch } = req.body;

  const checkAdmin = (value: AddGame): Promise<AddGame> => {
    //
    return Promise.resolve(value);
  };

  const checkNull = (value: AddGame): Promise<AddGame> => {
    //
    return Promise.resolve(value);
  };

  // Response to client
  const responseToClient = (value: AddGame): Response =>
    res.json({
      success: true,
      message: `${value.gamename} data is added !`
    });

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });
};
