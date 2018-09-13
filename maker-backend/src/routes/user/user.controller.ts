import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword } from 'src/lib';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

interface ChangeUsername {
  username: string;
  newUsername: string;
}
export const changeUsername = (req: Request, res: Response) => {
  const { username } = res.locals;
  const { newUsername } = req.body;

  // Null check
  const checkNull = (value: ChangeUsername) =>
    value.newUsername === undefined
      ? Promise.reject(new Error('Violation error !'))
      : value.newUsername.trim() === ''
        ? Promise.reject(new Error('Violation error !'))
        : Promise.resolve({ ...value, newUsername: value.newUsername.trim() });

  // Update name
  const updateUsername = (value: ChangeUsername) => {
    return new Promise((resolve, reject) => {
      User.update({ username: value.newUsername }, { where: { username: value.username } })
        .then(data => {
          console.log(data);
          console.log('dat');
          resolve(data);
        })
        .catch(err => {
          reject(new Error('Server error'));
          console.log(err.message);
          console.log('err');
        });
    });
  };

  // Response
  const responseToClient = (value: ChangeUsername) => {
    res.json({
      success: true,
      message: 'Username change success !',
      value: {
        before: value.username,
        after: value.newUsername
      }
    });
  };

  // Error handler
  const onError = (err: Error) => {
    res.status(409).json({
      success: false,
      message: err.message
    });
  };

  // Promise
  checkNull({ username, newUsername })
    .then(updateUsername)
    .then(responseToClient)
    .catch(onError);
};
