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
    genres: number[],
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
  gameId?: number; // Created New Game ID
  gamename: string; // Game name
  genres: number[]; // Genre's id (PK, foreign key)
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
    new Promise(async (resolve, reject) => {
      if (Array.isArray(value.genres) && value.genres.every(unit => typeof unit === 'number')) {
        const dbGenreIds = await GameGenre.findAll({}).then(dbGenres => dbGenres.map(genre => genre.dataValues.id));
        const cleanGenres = value.genres.filter(id => dbGenreIds.some(genreId => genreId === id));
        return resolve({ ...value, genres: cleanGenres });
      }

      return reject(new Error('There is a wrong value (genre)'));
    });

  // Create new game
  const createGame = (value: AddGame): Promise<AddGame> =>
    new Promise((resolve, reject) =>
      AllGame.create({
        gamename: value.gamename.trim(),
        window: value.window,
        mac: value.mac,
        xbox: value.xbox,
        ps: value.ps,
        nswitch: value.nswitch,
        android: value.android,
        ios: value.ios
      })
        .then(data => resolve({ ...value, gameId: data.dataValues.id }))
        .catch((err: DatabaseError) => reject(new Error(err.message)))
    );

  // Add genres to created game
  const addGenres = (value: AddGame): Promise<AddGame> =>
    new Promise(async (resolve, reject) =>
      value.genres.map((cleanId: number, i: number) =>
        AllGenreGame.create({
          gameId: value.gameId,
          genreId: cleanId
        })
          .then(() => value.genres.length - 1 === i && resolve(value))
          .catch((err: DatabaseError) => console.log(err.message, 'There is an error (genre & game connecting) !'))
      )
    );

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
  checkValue({ gamename, genres, window, mac, xbox, ps, nswitch, android, ios })
    .then(createGame)
    .then(addGenres)
    .then(responseToClient)
    .catch(onError);
};

/* PATCH
  Params: gamename,
  Body: {
    changeValue: {
      gamename?: string,
      genres?: number[],
      window?: boolean,
      mac?: boolean,
      xbox?: boolean,
      ps?: boolean,
      nswitch?: boolean,
      android?: boolean,
      ios?: boolean,
    }
  }
*/
interface ChangeGame {
  gameId?: number; // Game ID
  gamename: string; // Old Game name
  changeValue: ChangeValue; // game info will change by the changeValue
  genres?: number[]; // game's genre will change by this gneres
}
interface ChangeValue {
  gamename?: string;
  genres?: number[];
  window?: boolean;
  mac?: boolean;
  xbox?: boolean;
  ps?: boolean;
  nswitch?: boolean;
  android?: boolean;
  ios?: boolean;
}
export const changeGame = (req: Request, res: Response) => {
  const { gamename } = req.params;
  const { changeValue } = req.body;

  // Check all value is right
  const checkValue = (value: ChangeGame): Promise<ChangeGame> =>
    typeof value.changeValue === 'object' &&
    !Array.isArray(value.changeValue) &&
    typeof value.changeValue.gamename === 'string' &&
    value.changeValue.genres &&
    Array.isArray(value.changeValue.genres) &&
    value.changeValue.genres.every(key => typeof key === 'number')
      ? Promise.resolve(value)
      : Promise.reject(new Error('Validation error !'));

  // Sort value
  const sortValue = (value: ChangeGame): Promise<ChangeGame> =>
    new Promise(async (resolve, reject) => {
      // Sort genre && AllGame model value
      const dbGenreIds = await GameGenre.findAll({}).then(dbGenres => dbGenres.map(genre => genre.dataValues.id));
      const cleanGenres = value.changeValue.genres.filter(id => dbGenreIds.some(genreId => genreId === id));

      const changeValues: ChangeValue = value.changeValue;
      delete changeValues.genres;
      Object.keys(value.changeValue)
        .filter(
          key =>
            !(
              key === 'gamename' ||
              key === 'genres' ||
              key === 'window' ||
              key === 'mac' ||
              key === 'xbox' ||
              key === 'ps' ||
              key === 'nswitch' ||
              key === 'android' ||
              key === 'ios'
            )
        )
        .map(wrongValue => delete changeValues[wrongValue]);

      resolve({ ...value, genres: cleanGenres, changeValue: changeValues });
    });

  // Find game information
  const findGame = (value: ChangeGame): Promise<ChangeGame> =>
    new Promise((resolve, reject) =>
      AllGame.findOne({ where: { gamename: value.gamename } })
        .then(
          game =>
            game ? resolve({ ...value, gameId: game.dataValues.id }) : reject(new Error(`Game: ${value.gamename} is not in the database`))
        )
        .catch((err: DatabaseError) => reject(new Error(err.message)))
    );

  // Update game information
  const updateGame = (value: ChangeGame): Promise<ChangeGame> =>
    new Promise((resolve, reject) =>
      AllGame.update(value.changeValue, {
        where: {
          id: value.gameId
        }
      })
        .then(data => resolve(value))
        .catch((err: DatabaseError) => reject(new Error(err.message)))
    );

  // Update game genre
  const updateGenre = (value: ChangeGame): Promise<ChangeGame> =>
    new Promise(async (resolve, reject) =>
      AllGenreGame.destroy({ where: { gameId: value.gameId } })
        .then(() =>
          value.genres.map((cleanId: number, i: number) =>
            AllGenreGame.create({
              gameId: value.gameId,
              genreId: cleanId
            })
              .then(() => value.genres.length - 1 === i && resolve(value))
              .catch((err: DatabaseError) => console.log(err.message, 'There is an error (genre & game connecting) !'))
          )
        )
        .catch((err: DatabaseError) => console.log(err.message, 'There is an error on (genre & game connecting)'))
    );

  // Response to cline
  const responseToClient = (value: ChangeGame): Response =>
    res.json({
      success: true,
      message: `${value.gamename} data is added !`,
      value: {}
    });

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
  checkValue({ gamename, changeValue })
    .then(sortValue)
    .then(findGame)
    .then(updateGame)
    .then(updateGenre)
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
