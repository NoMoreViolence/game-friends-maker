import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import { FilteredModelAttributes } from 'sequelize-typescript/lib/models/Model';
import { AllGame, GameGenre } from 'db';

/* GET
 */
export const getAllGame = (req: Request, res: Response): void => {
  console.log('fuck');
  const findAllGame = (): Promise<Array<FilteredModelAttributes<AllGame & { genres: string[] }>>> =>
    new Promise((resolve, reject) =>
      AllGame.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        include: [{ model: GameGenre, attributes: ['genre'] }]
      })
        .then(games =>
          resolve(
            games.map(game => ({
              ...game.dataValues,
              genres: game.dataValues.genres.map(genre => genre.genre)
            }))
          )
        )
        .catch((err: DatabaseError) => reject(new Error(err.name)))
    );

  const responseToClient = (value: Array<FilteredModelAttributes<AllGame>>): Response =>
    res.json({
      success: true,
      message: 'Load all game success !',
      value
    });

  const onError = (err: Error): Response =>
    res.status(400).json({
      success: false,
      message: err.message
    });

  findAllGame()
    .then(responseToClient)
    .catch(onError);
};

/* GET
  params: {
    game: string
  }
*/
export const getGame = (req: Request, res: Response): void => {
  const { game } = req.params;

  const findGame = (gamename: string): Promise<FilteredModelAttributes<AllGame & { genres: string[] }>> =>
    new Promise((resolve, reject) =>
      AllGame.findOne({
        where: {
          gamename
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        },
        include: [{ model: GameGenre, attributes: ['genre'] }]
      })
        .then(result =>
          resolve({
            ...result.dataValues,
            genres: result.dataValues.genres.map(genre => genre.dataValues.genre)
          })
        )
        .catch((err: DatabaseError) => reject(new Error(err.name)))
    );

  const responseToClient = (value: FilteredModelAttributes<AllGame & { genres: string[] }>): Response =>
    res.json({
      success: true,
      message: 'find game success',
      value
    });

  const onError = (err: Error): Response =>
    res.status(400).json({
      success: false,
      message: err.message
    });

  findGame(game)
    .then(responseToClient)
    .catch(onError);
};
