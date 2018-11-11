import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import { FilteredModelAttributes } from 'sequelize-typescript/lib/models/Model';
import { AllGame, GameGenre } from 'db';

/* GET
 */
export const getAllGame = (req: Request, res: Response): void => {
  const findAllGame = (): Promise<Array<FilteredModelAttributes<AllGame & { genres: string[] }>>> =>
    new Promise((resolve, reject) =>
      AllGame.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        include: [{ model: GameGenre, attributes: ['genre'] }]
      })
        .then(games => resolve(games.map(game => ({ ...game.dataValues, genres: game.dataValues.genres.map(genre => genre.genre) }))))
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
