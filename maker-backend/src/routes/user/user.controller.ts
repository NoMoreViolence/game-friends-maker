import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as random from 'randomstring';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt, mailer } = lib;

/* PATCH
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
    value.newThing === undefined || value.newThing === null
      ? Promise.reject(new Error('There is a validation error !'))
      : typeof value.newThing !== 'string'
        ? Promise.reject(new Error('There is a validation error !'))
        : value.newThing.trim() === ''
          ? Promise.reject(new Error('There is a validation error !'))
          : Promise.resolve({ ...value, newThing: value.newThing.trim() });

  // 'what' params is valid check
  const checkWhatShouldUpdate = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    value.what === 'username' || value.what === 'email'
      ? Promise.resolve(value)
      : Promise.reject(new Error('There is wrong api request !'));

  // 'duplicate' check
  const checkDuplicate = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    value.what === 'username'
      ? value.newThing === value.username
        ? Promise.reject(new Error('There is a duplicate check error !'))
        : Promise.resolve(value)
      : value.newThing === value.email
        ? Promise.reject(new Error('There is a duplicate check error !'))
        : Promise.resolve(value);

  // Update
  const updateThing = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    value.what === 'username'
      ? new Promise((resolve, reject) => {
          User.update({ [value.what]: value.newThing }, { where: { [value.what]: value[value.what] } })
            .then(() => resolve(value))
            .catch((err: DatabaseError) => {
              reject(new Error(err.message));
            });
        })
      : new Promise((resolve, reject) => {
          User.update({ [value.what]: value.newThing, verified: false, emailkey: '.' }, { where: { [value.what]: value[value.what] } })
            .then(() => resolve(value))
            .catch((err: DatabaseError) => {
              reject(new Error(err.message));
            });
        });

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
    .then(checkWhatShouldUpdate)
    .then(checkDuplicate)
    .then(updateThing)
    .then(createJWT)
    .then(responseToClient)
    .catch(onError);
};

/* PATCH 
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
              : reject(new Error('There is a validation error !)'))
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
          reject(new Error('There is a duplicate check error !'));
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

/* POST
  {}
*/
interface RequestEamilVerifyCode {
  randomKey: string;
  email: string;
}
export const requestEmailVerifyCode = (req: Request, res: Response) => {
  const { email } = res.locals;

  // Create random key
  const generateRandomKey = (value: RequestEamilVerifyCode): Promise<RequestEamilVerifyCode> =>
    Promise.resolve({ ...value, randomKey: random.generate({ length: 6, charset: 'alphanumeric', readable: true }) });

  // Database update
  const insertRandomKeyToDatabase = (value: RequestEamilVerifyCode): Promise<RequestEamilVerifyCode> =>
    new Promise((resolve, reject) =>
      User.update(
        { emailkey: value.randomKey },
        {
          where: { email: value.email, verified: false },
          silent: true
        }
      )
        .then(data => (data[0] !== 0 ? resolve(value) : reject(new Error('There is a unexpected error !'))))
        .catch((err: DatabaseError) => reject(new Error(err.message)))
    );

  // Send mail
  const sendMail = (value: RequestEamilVerifyCode): Promise<RequestEamilVerifyCode> => {
    mailer(value.email, value.randomKey)
      .then(() => console.log('Mail send success !'))
      .catch(err => console.log('Mail send failure !', err));
    return Promise.resolve(value);
  };

  // Response to client
  const responseToClient = (value: RequestEamilVerifyCode): Response =>
    res.json({
      success: true,
      message: 'Send mail success !'
    });

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
  generateRandomKey({ randomKey: '', email })
    .then(insertRandomKeyToDatabase)
    .then(sendMail)
    .then(responseToClient)
    .catch(onError);
};

/* POST
  Body: {
    randomKey: string
  }
*/
interface CheckEmailVerifyCode {
  randomKey: string;
}
export const checkEmailVerifyCode = (req: Request, res: Response) => {
  const { randomKey } = req.body;

  // Check random key
  // If random key is same as databases it, 'verified' will update
  const compareRandomKey = (value: CheckEmailVerifyCode): Promise<CheckEmailVerifyCode> =>
    new Promise((resolve, reject) =>
      User.update(
        { verified: true },
        {
          where: { emailkey: value.randomKey },
          silent: true
        }
      )
        .then(data => (data[0] !== 0 ? resolve(value) : reject(new Error('Email verify failure !'))))
        .catch((err: DatabaseError) => reject(new Error('There is a database error !')))
    );

  // Response to client
  const responseToClient = (valeu: CheckEmailVerifyCode): Response =>
    res.json({
      success: true,
      message: 'Email verify success !'
    });

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
  compareRandomKey({ randomKey })
    .then(responseToClient)
    .catch(onError);
};
