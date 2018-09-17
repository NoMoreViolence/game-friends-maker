import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';
import encryptoPassword from '../../lib/encrypto_password';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

/* POST
  params: 'what',
  body: {
    newThing: string;
  }
*/
interface ChangeUserInfo {
  what: string;
  id: number;
  username: string;
  email: string;
  newThing: string;
  changedModel?: User;
  token: string;
}
export const changeUserInfo = (req: Request, res: Response) => {
  const { what } = req.params; // username or email, gives direction what has to be change
  const { username, email, id } = res.locals; // decoded token value, same as databases username and email
  const { newThing } = req.body; // new change value, it could be username or email

  // Null Check
  const checkNull = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    value.newThing === undefined
      ? Promise.reject(new Error('There is a validation error !'))
      : value.newThing.trim() === ''
        ? Promise.reject(new Error('There is a validation error !'))
        : Promise.resolve({ ...value, newThing: value.newThing.trim() });

  // 'what' params is valid check
  const checkWhatShouldBeUpdate = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    value.what === 'username'
      ? Promise.resolve(value)
      : value.what === 'email'
        ? Promise.resolve(value)
        : Promise.reject(new Error('There is wrong api request !'));

  // 'newThing' regex check
  const checkNewThingRegex = (value: ChangeUserInfo): Promise<ChangeUserInfo> => {
    const thisRegex = value.what === 'username' ? regex.usernameRegex : regex.emailRegex;

    return new Promise((resolve, reject) => {
      validation
        .checkValidationAll([{ regex: thisRegex, value: value.newThing, name: value.what }])
        .then(data => (data.result === true ? resolve(value) : reject(new Error(`There is a validation error (${value.what}) ! `))))
        .catch(err => reject(new Error('There is a server error !')));
    });
  };

  // Update
  const updateThing = (value: ChangeUserInfo): Promise<ChangeUserInfo> => {
    return value.what === 'username'
      ? new Promise((resolve, reject) => {
          User.update({ [value.what]: value.newThing }, { where: { [value.what]: value[value.what] } })
            .then(() => resolve(value))
            .catch(err => {
              console.log(err.message);
              reject(new Error(`There is a duplicate check error !`));
            });
        })
      : new Promise((resolve, reject) => {
          User.update({ [value.what]: value.newThing, verified: false }, { where: { [value.what]: value[value.what] } })
            .then(() => resolve(value))
            .catch(err => {
              console.log(err.message);
              reject(new Error(`There is a duplicate check error !`));
            });
        });
  };

  // Create jwt token
  const createJWT = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    new Promise((resolve, reject) =>
      jwt
        .createJWT(
          value.id,
          value.what === 'username' ? value.newThing : value.username,
          value.what === 'email' ? value.newThing : value.email
        )
        .then((data: string) => resolve({ ...value, token: data }))
        .catch((err: JsonWebTokenError) => reject(new Error('There is a server error !')))
    );

  // Response
  const responseToClient = (value: ChangeUserInfo) => {
    res.cookie('accessToken', { token: value.token }, { maxAge: 2628000 * 2, httpOnly: true });
    res.json({
      success: true,
      message: 'Change user information success !',
      value: {
        what: value.what,
        before: value.what === 'username' ? username : email,
        after: value.newThing
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
  checkNull({ what, id, username, email, newThing, token: '' })
    .then(checkWhatShouldBeUpdate)
    .then(checkNewThingRegex)
    .then(updateThing)
    .then(createJWT)
    .then(responseToClient)
    .catch(onError);
};

/* POST
  body: {
    oldPassword: string;
    newPassword: string;
  }
*/
interface ChangeUserPassword {
  id: number;
  username: string;
  email: string;
  oldPassword: string;
  oldSalt: string;
  newPassword: string;
  newSalt: string;
  token: string;
}
export const changeUserPassword = (req: Request, res: Response) => {
  const { username, email, id } = res.locals; // decoded token value, same as databases id, username and email
  const { oldPassword, newPassword } = req.body;

  // Regex check + new password encryption
  const checkNewPasswordRegex = (value: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([
          { regex: regex.passwordRegex, value: value.newPassword, name: 'password' },
          { regex: regex.passwordRegex, value: value.oldPassword, name: 'password' }
        ])
        .then(
          data =>
            data.result === true
              ? encrypto({ password: value.newPassword, salt: salt() })
                  .then(pw => resolve({ ...value, newPassword: pw.password, newSalt: pw.salt }))
                  .catch(err => reject(new Error('There is a server error !')))
              : reject(new Error(`There is a validation error !)`))
        )
        .catch(err => reject(new Error('There is a server error !')))
    );

  // Find old salt
  const findOldSalt = (value: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) => {
      User.findOne({ where: { id: value.id } }).then(data => {
        data.dataValues.id ? resolve({ ...value, oldSalt: data.dataValues.salt }) : reject(new Error('Wrong password !'));
      });
    });

  // Password encrypto
  const encryptoOldPassword = (value: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) =>
      encrypto({ password: value.oldPassword, salt: value.oldSalt })
        .then((data: EncryptoPassword) => resolve({ ...value, oldPassword: data.password }))
        .catch((err: Error) => reject(new Error('There is a server Error !')))
    );

  // Update
  const updatePassword = (value: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) => {
      User.update({ password: value.newPassword, salt: value.newSalt }, { where: { password: value.oldPassword } })
        .then(() => resolve(value))
        .catch(err => {
          console.log(err.message);
          reject(new Error(`There is a duplicate check error !`));
        });
    });

  // Create jwt token
  const createJWT = (value: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) =>
      jwt
        .createJWT(value.id, value.username, value.email)
        .then((data: string) => resolve({ ...value, token: data }))
        .catch((err: JsonWebTokenError) => reject(new Error('There is a server error !')))
    );

  // Response
  const responseToClient = (value: ChangeUserPassword) => {
    res.cookie('accessToken', { token: value.token }, { maxAge: 2628000 * 2, httpOnly: true });
    res.json({
      success: true,
      message: 'Change user password success !'
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
  checkNewPasswordRegex({ id, username, email, oldPassword, oldSalt: '', newPassword, newSalt: '', token: '' })
    .then(findOldSalt)
    .then(encryptoOldPassword)
    .then(updatePassword)
    .then(createJWT)
    .then(responseToClient)
    .catch(onError);
};
