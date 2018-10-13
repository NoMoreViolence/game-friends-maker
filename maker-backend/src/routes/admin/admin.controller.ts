import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User, UserGame, AllGame, AllGenreGame, GameGenre } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

/* POST
  Params: gamename,
  Body: {
    genres: Array<{name: string}>
    window: boolean,
    mac: boolean,
    xbox: boolean,
    ps: boolean,
    nswitch: boolean,
    android: boolean,
    ios: boolean
  }
*/
interface AddGame {
  gameId: number; // Created New Game ID
  gamename: string;
  genres: number[];
  window: boolean;
  mac: boolean;
  xbox: boolean;
  ps: boolean;
  nswitch: boolean;
  android: boolean;
  ios: boolean;
}
export const addGame = (req: Request, res: Response) => {
  const { gamename } = req.params;
  const { genres, window, mac, xbox, ps, nswitch, android, ios } = req.body;

  // Genre Check
  const checkValue = (value: AddGame): Promise<AddGame> =>
    Array.isArray(value.genres)
      ? value.genres.every(unit => typeof unit === 'number')
        ? Promise.resolve(value)
        : Promise.reject(new Error('There is a wrong value (genre)'))
      : Promise.reject(new Error('There is a wrong value (genre)'));

  // Create new game
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

  // Add genres to created game
  const addGenres = (value: AddGame): Promise<AddGame> =>
    new Promise(async (resolve, reject) => {
      const dbGenreIds = await GameGenre.findAll({}).then(dbGenres => dbGenres.map(genre => genre.dataValues.id));
      const cleanGenres = value.genres.filter(id => dbGenreIds.some(genreId => genreId === id));

      cleanGenres.map((cleanId: number, i: number) =>
        AllGenreGame.create({
          gameid: value.gameId,
          genreid: cleanId
        })
          .then(() => cleanGenres.length - 1 === i && resolve({ ...value, genres: cleanGenres }))
          .catch((err: DatabaseError) => console.log('There is an error (genre & game connecting) !'))
      );
    });

  // Response to client
  const responseToClient = (value: AddGame): Response =>
    res.json({
      success: true,
      message: `${value.gamename} data is added !`,
      value: {
        gamename: value.gamename,
        genres: value.genres,
        window: value.window,
        mac: value.mac,
        xbox: value.xbox,
        ps: value.ps,
        nswitch: value.nswitch,
        android: value.android,
        ios: value.ios
      }
    });

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
  checkValue({ gameId: -1, gamename, genres, window, mac, xbox, ps, nswitch, android, ios })
    .then(createGame)
    .then(addGenres)
    .then(responseToClient)
    .catch(onError);
};

/* POST 
  Params: {
    genre: string
  }
*/
interface AddGenre {
  genre: string;
}
export const addGenre = (req: Request, res: Response) => {
  const { genre } = req.params;

  // Create genre
  const createGenre = (value: AddGenre): Promise<AddGenre> =>
    new Promise((resolve, reject) =>
      GameGenre.create({
        genre: value.genre.toUpperCase()
      })
        .then(newGenre => resolve(value))
        .catch((err: DatabaseError) => reject(new Error(err.message)))
    );

  // Response to client
  const responseToClient = (value: AddGenre): Response =>
    res.json({
      success: true,
      message: `New game genre(${value.genre}) added !`
    });

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
  createGenre({ genre })
    .then(responseToClient)
    .catch(onError);
};

/* PATCH
  Params: {
    genre: string
  },
  Body: {
    newGenre: string
  }
*/
interface ChangeGenre {
  genre: string;
  newGenre: string;
}
export const changeGenre = (req: Request, res: Response) => {
  const { genre } = req.params;
  const { newGenre } = req.body;

  // Update genre
  const updateGenre = (value: ChangeGenre): Promise<ChangeGenre> =>
    new Promise((resolve, reject) =>
      GameGenre.update(
        { genre: value.newGenre },
        {
          where: { genre: value.genre }
        }
      )
        .then(updatedGenre => resolve(value))
        .catch((err: DatabaseError) => reject(new Error(err.message)))
    );

  // Response to client
  const responseToClient = (value: ChangeGenre): Response =>
    res.json({
      success: true,
      message: `${value.genre} changed to ${value.newGenre}`
    });

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
  updateGenre({ genre, newGenre })
    .then(responseToClient)
    .catch(onError);
};

/* DELETE
  Params: {
    genre: string
  }
*/
interface DeleteGenre {
  genre: string;
}
export const deleteGenre = (req: Request, res: Response) => {
  const { genre } = req.params;

  // Update genre
  const destroyGenre = (value: DeleteGenre): Promise<DeleteGenre> =>
    new Promise((resolve, reject) =>
      GameGenre.destroy({
        where: { genre: value.genre }
      })
        .then(deletedGenre => resolve(value))
        .catch((err: DatabaseError) => reject(new Error(err.message)))
    );

  // Response to client
  const responseToClient = (value: DeleteGenre): Response =>
    res.json({
      success: true,
      message: `${value.genre} genre is deleted successfully !`
    });

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
  destroyGenre({ genre })
    .then(responseToClient)
    .catch(onError);
};
