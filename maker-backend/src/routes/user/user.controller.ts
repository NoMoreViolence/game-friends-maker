import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as random from 'randomstring';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt, mailer } = lib;

interface DecodedToken {
  id: number;
  username: string;
  email: string;
}

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

export const profileImageUpload = (req: Request, res: Response) => {
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
};
export const profileImageDelete = (req: Request, res: Response) => {
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
};

export const getProfile = (req: Request, res: Response) => {
  res.json({});
};
