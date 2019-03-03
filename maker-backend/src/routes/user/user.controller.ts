import { Request, Response, response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword, Omit } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as random from 'randomstring';
import middleware from 'src/middleware';

const imageUpload = middleware.upload.single('profile-image');
const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt, mailer } = lib;

interface DecodedToken {
  id: number;
  username: string;
  email: string;
}

/* GET
 */
interface Profile {
  username: string;
  introduce: string;
  pictureUrl: string;
  visibility: boolean;
}
export const getMyProfile = (req: Request, res: Response) => {
  const { id, username, email }: DecodedToken = res.locals;

  const getData = (decodedToken: DecodedToken): Promise<Profile> => {
    return new Promise((resolve, reject) =>
      User.findOne({
        where: { id: decodedToken.id }
      })
        .then((user: User) =>
          user.id
            ? resolve({
                username: user.username,
                introduce: user.introduce,
                visibility: user.show,
                pictureUrl: user.pictureUrl
              })
            : reject(new Error('Server error !'))
        )
        .catch(() => reject(new Error('Server error !')))
    );
  };

  const responseToClient = (profile: Profile): Response =>
    res.json({
      success: true,
      message: '',
      value: profile
    });

  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  getData({ id, username, email })
    .then(responseToClient)
    .catch(onError);
};

/* PATCH
  params: {
  },
  body: {
    username: string,
    introduce: string,
    visibility: 1 | 0
  }
*/
interface Changes {
  id: number;
  username?: string;
  introduce?: string;
  visibility?: 1 | 0;
}
export const changeMyProfile = (req: Request, res: Response) => {
  const { id } = res.locals;
  const { username, introduce, visibility } = req.body;

  const createObject = (changes: Changes) => {
    return Promise.resolve({
      id: changes.id,
      changes: Object.assign(
        {},
        changes.introduce ? { introduce: changes.introduce } : {},
        changes.username ? { username: changes.username } : {},
        changes.visibility ? { visibility: changes.visibility } : {}
      )
    });
  };

  const changeProfile = (update: { id: number; changes: Omit<Changes, 'id'> }) =>
    new Promise((resolve, reject) => {
      User.update(update.changes, {
        where: { id: update.id },
        silent: true
      })
        .then(updated => resolve())
        .catch((err: DatabaseError) => reject(new Error(err.name)));
    });

  const responseToClient = (): Response =>
    res.json({
      success: true,
      message: ''
    });

  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  createObject({ id, username, introduce, visibility })
    .then(changeProfile)
    .then(responseToClient)
    .catch(onError);
};

/* POST 
  params: {
  },
  body: {
    profile-image: File
  }
*/
export const uploadProfileImage = (req: Request, res: Response) => {
  const { id }: DecodedToken = res.locals;

  return imageUpload(req, res, (err: Error) => {
    const errorChecking = (error: Error, request: Request, userId: number) =>
      new Promise((resolve, reject) => {
        if (!error) {
          return resolve({ request, userId });
        }
        console.log(err);
        reject(new Error(err.message));
      });

    const saveToDatabase = (saves: { request: Request; userId: number }) =>
      new Promise((resolve, reject) => {
        User.update(
          {
            pictureUrl: (saves.request.file as any).location
          },
          { where: { id }, silent: true }
        )
          .then(updated => resolve())
          .catch((error: DatabaseError) => reject(new Error(error.name)));
      });

    const responseToClient = (): Response =>
      res.json({
        success: true,
        message: ''
      });

    const onError = (error: Error): Response =>
      res.status(409).json({
        success: false,
        message: error.message
      });

    errorChecking(err, req, id)
      .then(saveToDatabase)
      .then(responseToClient)
      .catch(onError);
  });
};

/* DELETE
  params: {},
  body: {}
*/
export const deleteProfileImage = (req: Request, res: Response) => {
  const { id }: DecodedToken = res.locals;

  const deleteProfileImageUrl = (userId: number) =>
    new Promise((resolve, reject) => {
      User.update(
        {
          pictureUrl: ''
        },
        { where: { id: userId }, silent: true }
      )
        .then(updated => resolve())
        .catch((error: DatabaseError) => reject(new Error(error.name)));
    });

  const responseToClient = (): Response =>
    res.json({
      success: true,
      message: ''
    });

  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  deleteProfileImageUrl(id)
    .then(responseToClient)
    .catch(onError);
};

// Public api
export const getProfile = (req: Request, res: Response) => {
  res.json({});
};
