import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

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
  const { username, email } = res.locals; // decoded token value, same as databases username and email
  const { newThing } = req.body; // new change value, it could be username or email

  // Null
  const checkNull = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    value.newThing === undefined
      ? Promise.reject(new Error('There is a violation error !'))
      : value.newThing.trim() === ''
        ? Promise.reject(new Error('There is a violation error !'))
        : Promise.resolve({ ...value, newThing: value.newThing.trim() });

  // 'what' params is valid
  const checkWhatShouldBeUpdate = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    value.what === 'username'
      ? Promise.resolve(value)
      : value.what === 'email'
        ? Promise.resolve(value)
        : Promise.reject(new Error('There is wrong api request !'));

  // check newThing regex
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
  // 현재 바꾸려는 데이터가 중복일 때의 옵션이 전혀 고려되어 있지 않음
  // 그래서 그 부분을 매꾸어야 함
  const updateThing = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    new Promise((resolve, reject) => {
      User.update({ [value.what]: value.newThing }, { where: { [value.what]: value[value.what] } })
        .then(data => {
          console.log(data);
          console.log('data');
          resolve({ ...value, id: data[1][0].id, changedModel: data[1][0] });
        })
        .catch(err => {
          console.log(err.message);
          console.log('err');
          reject(new Error('There is a dtabase Error !'));
        });
    });

  // Create jwt token
  const createJWT = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    new Promise((resolve, reject) =>
      jwt
        .createJWT(value.id, value.changedModel.username, value.changedModel.email)
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
  checkNull({ what, id: -1, username, email, newThing, token: '' })
    .then(checkWhatShouldBeUpdate)
    .then(checkNewThingRegex)
    .then(updateThing)
    .then(createJWT)
    .then(responseToClient)
    .catch(onError);
};

const changePassword = (req: Request, res: Response) => {
  //
};
