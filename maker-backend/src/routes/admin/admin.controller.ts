import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User, Game, AllGame, AllGenreGame } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

interface AddGame {
  id: number;
  gameId: number;
  gamename: string;
  genre: number[];
  window: boolean;
  mac: boolean;
  xbox: boolean;
  ps: boolean;
  nswitch: boolean;
  android: boolean;
  ios: boolean;
}
export const addGame = (req: Request, res: Response) => {
  const { id } = res.locals;
  const { gamename } = req.params;
  const { genre, window, mac, xbox, ps, nswitch, android, ios } = req.body;

  const checkValue = (value: AddGame): Promise<AddGame> =>
    new Promise(
      (resolve, reject) => (Array.isArray(value.genre) ? resolve(value) : reject(new Error('There is a wrong value (genre)')))
    );

  const checkAdmin = (value: AddGame): Promise<AddGame> =>
    value.id === 1 ? Promise.resolve(value) : Promise.reject(new Error('You are not admin !'));

  const createGame = (value: AddGame): Promise<AddGame> =>
    new Promise((resolve, reject) => {
      AllGame.create({
        gamename: value.gamename,
        window: value.window,
        mac: value.mac,
        xbox: value.xbox,
        ps: value.ps,
        nswitch: value.nswitch,
        android: value.android,
        ios: value.ios
      })
        .then(data => resolve({ ...value, gameId: data.dataValues.id }))
        .catch((err: DatabaseError) => reject(new Error(err.message)));
    });

  const addGenre = (value: AddGame): Promise<AddGame> => {
    value.genre.map((object: number, i: number) =>
      AllGenreGame.create({
        allid: value.gameId,
        genreid: object
      })
        .then(() => console.log(`${i}th genre add success !`))
        .catch(() => console.log(`${i}th genre add failure !`))
    );

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

  checkValue({ id, gameId: -1, gamename, genre, window, mac, xbox, ps, nswitch, android, ios })
    .then(checkAdmin)
    .then(createGame)
    .then(addGenre)
    .then(responseToClient)
    .catch(onError);
};
