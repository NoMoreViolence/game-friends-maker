import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User, UserGame, AllGame } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as random from 'randomstring';
import { CheckReturnValue } from 'src/lib/check_validation';

const { salt, regex, validation, encrypto, jwt, mailer } = lib;

/* GET
  Params: what
  Query: {
    checkvalue: string
  }
*/
interface CheckDuplication {
  regex: { usernameRegex: RegExp; emailRegex: RegExp; passwordRegex: RegExp };
  what: string;
  checkvalue: string;
}
export const checkDuplication = (req: Request, res: Response): void => {
  const { what } = req.params;
  const { checkvalue } = req.query;

  const checkWhatShouldUpdate = (duplication: CheckDuplication): Promise<CheckDuplication> =>
    duplication.what === 'username' || duplication.what === 'email'
      ? Promise.resolve(duplication)
      : Promise.reject(new Error('There is a wrong request !'));

  const checkValidation = (duplications: CheckDuplication): Promise<CheckDuplication> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([
          {
            regex: regex[`${duplications.what}Regex`],
            value: duplications.checkvalue,
            name: duplications.what
          }
        ])
        .then(() => resolve(duplications))
        .catch(() => reject(new Error('There is no information')))
    );

  const DoubleCheck = (duplication: CheckDuplication): Promise<void> =>
    new Promise((resolve, reject) =>
      User.findOne({
        where: { [what]: duplication.checkvalue }
      })
        .then((data: User) => (data ? reject(new Error(`There is a duplicate information ${duplication.what} !`)) : resolve()))
        .catch(() => reject(new Error('There is an user input error !')))
    );

  const responseToClient = (): Response =>
    res.json({
      success: true,
      message: 'DoubleCheck success !'
    });

  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  checkWhatShouldUpdate({ what, checkvalue, regex })
    .then(checkValidation)
    .then(DoubleCheck)
    .then(responseToClient)
    .catch(onError);
};

/* POST 
  Body: {
    username: string
    email: string
    password: string
  }
*/
interface Register {
  regex: { usernameRegex: RegExp; emailRegex: RegExp; passwordRegex: RegExp };
  username: string;
  email: string;
  password: string;
  salt: string;
}
export const register = (req: Request, res: Response): void => {
  const { username, email, password } = req.body;

  const checkNull = (userRegister: Register): Promise<Register> =>
    typeof userRegister.username === 'string' && typeof userRegister.email === 'string' && typeof userRegister.password === 'string'
      ? Promise.resolve({
          ...userRegister,
          username: userRegister.username.trim(),
          email: userRegister.email.trim(),
          password: userRegister.password.trim()
        })
      : Promise.reject(new Error('There is no data !'));

  const checkPasswordValidation = (userRegister: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([
          {
            regex: userRegister.regex.passwordRegex,
            value: userRegister.password,
            name: 'password'
          }
        ])
        .then(() => resolve(userRegister))
        .catch(() => reject(new Error('Validation error: (password)')))
    );

  const passwordEncryption = (userRegister: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      encrypto({ password: userRegister.password, salt: salt() })
        .then((data: EncryptoPassword) => resolve({ ...userRegister, password: data.password, salt: data.salt }))
        .catch((err: Error) => reject(new Error('There is a server error !')))
    );

  const addUser = (userRegister: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      User.create({
        username: userRegister.username,
        email: userRegister.email,
        password: userRegister.password,
        salt: userRegister.salt,
        verified: false
      })
        .then((data: User) => (data ? resolve(userRegister) : reject(new Error('There is a server Error !'))))
        .catch((err: DatabaseError) => reject(new Error(err.name)))
    );

  const responseToClient = (userRegister: Register) =>
    res.json({
      success: true,
      message: 'Register success !',
      value: { username: userRegister.username, email: userRegister.email }
    });

  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  checkNull({ regex, username, email, password, salt: '' })
    .then(checkPasswordValidation)
    .then(passwordEncryption)
    .then(addUser)
    .then(responseToClient)
    .catch(onError);
};

/* POST
  Body: {
    email: string
    password: string
  }
*/
interface Login {
  id: number;
  username: string;
  email: string;
  password: string;
  hashedPassword: string;
  salt: string;
  token: string;
}
export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const checkValidation = (loginData: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([
          { regex: regex.emailRegex, value: loginData.email, name: 'email' },
          { regex: regex.passwordRegex, value: loginData.password, name: 'password' }
        ])
        .then(() => resolve(loginData))
        .catch((err: CheckReturnValue) => reject(new Error(`There is a validation error (${err.errRegex}) ! `)))
    );

  const findData = (loginData: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      User.findOne({ where: { email: loginData.email } })
        .then((user: User) =>
          user
            ? resolve({
                ...loginData,
                id: user.id,
                username: user.username,
                hashedPassword: user.password,
                salt: user.salt
              })
            : reject(new Error('There is no user data that have request email !'))
        )
        .catch((err: DatabaseError) => reject(new Error('Server error !')))
    );

  const passwordEncryption = (loginData: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      encrypto({ password: loginData.password, salt: loginData.salt })
        .then((data: EncryptoPassword) => resolve({ ...loginData, password: data.password }))
        .catch((err: Error) => reject(new Error('There is a server Error !')))
    );

  const compareData = (loginData: Login): Promise<Login> =>
    loginData.password === loginData.hashedPassword ? Promise.resolve(loginData) : Promise.reject(new Error('There is a password error !'));

  const createToken = (loginData: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      jwt
        .createJWT(loginData.id, loginData.username, loginData.email)
        .then((data: string) => resolve({ ...loginData, token: data }))
        .catch((err: JsonWebTokenError) => reject(new Error('Server error !')))
    );

  const responseToClient = (loginData: Login): Response =>
    res.json({
      success: true,
      message: 'Login success !',
      value: {
        admin: loginData.id === 1 ? true : false,
        username: loginData.username,
        email: loginData.email,
        token: loginData.token
      }
    });

  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  checkValidation({
    id: -1,
    username: '',
    email,
    password,
    hashedPassword: '',
    salt: '',
    token: ''
  })
    .then(findData)
    .then(passwordEncryption)
    .then(compareData)
    .then(createToken)
    .then(responseToClient)
    .catch(onError);
};

/* Post
  Body: {
    tokenValue: {
      id: string,
      username: string,
      email: string,
      iat: number,
      exp: number,
      iss: string
    }
  }
*/
export const check = (req: Request, res: Response) => {
  const { username, email, id } = res.locals;

  res.json({
    success: true,
    message: 'Token access success !',
    value: {
      admin: id === 1 ? true : false,
      username,
      email
    }
  });
};

/* GET

*/
interface Withdraw {
  id: number;
}
export const withdraw = (req: Request, res: Response) => {
  const { id } = res.locals;

  const destroyAccount = (goodByeUser: Withdraw): Promise<Withdraw> =>
    new Promise((resolve, reject) =>
      User.destroy({
        where: { id }
      })
        .then(data => resolve(goodByeUser))
        .catch((err: DatabaseError) => reject(new Error('There is a database error !')))
    );

  const responseToClient = (): Response =>
    res.json({
      success: true,
      message: 'Withdraw success ! good bye.'
    });

  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  destroyAccount({ id })
    .then(responseToClient)
    .catch(onError);
};

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
  const { what } = req.params; // gives direction what has to be change
  const { username, email, id } = res.locals;
  const { newThing } = req.body;

  const typeCheck = (userInfo: ChangeUserInfo): Promise<ChangeUserInfo> =>
    typeof userInfo.newThing === 'string'
      ? Promise.resolve({ ...userInfo, newThing: userInfo.newThing.trim() })
      : Promise.reject(new Error(''));

  const checkWhatShouldUpdate = (userInfo: ChangeUserInfo): Promise<ChangeUserInfo> =>
    userInfo.what === 'username' || userInfo.what === 'email'
      ? Promise.resolve(userInfo)
      : Promise.reject(new Error('There is wrong api request !'));

  const checkDuplicate = (userInfo: ChangeUserInfo): Promise<ChangeUserInfo> =>
    userInfo.newThing === userInfo[what] ? Promise.reject(new Error('You cannot change same as before !')) : Promise.resolve(userInfo);

  const updateThing = (userInfo: ChangeUserInfo): Promise<ChangeUserInfo> =>
    new Promise((resolve, reject) =>
      User.update(
        {
          [userInfo.what]: userInfo.newThing
        },
        { where: { [userInfo.what]: userInfo[userInfo.what] } }
      )
        .then(() => resolve(userInfo))
        .catch((err: DatabaseError) => reject(new Error(err.name)))
    );

  const createJWT = (userInfo: ChangeUserInfo): Promise<ChangeUserInfo> =>
    new Promise((resolve, reject) =>
      jwt
        .createJWT(
          userInfo.id,
          userInfo.what === 'username' ? userInfo.newThing : userInfo.username,
          userInfo.what === 'email' ? userInfo.newThing : userInfo.email
        )
        .then((token: string) => resolve({ ...userInfo, token }))
        .catch(() => reject(new Error('Server error !')))
    );

  const responseToClient = (userInfo: ChangeUserInfo) =>
    res.json({
      success: true,
      message: 'Change user information success !',
      value: {
        what: userInfo.what,
        before: userInfo.what === 'username' ? username : email,
        after: userInfo.newThing,
        token: userInfo.token
      }
    });

  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  typeCheck({ what, id, username, email, newThing, token: '' })
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

  const checkNewPasswordRegex = (passwordChange: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([
          { regex: regex.passwordRegex, value: passwordChange.newPassword, name: 'password' },
          { regex: regex.passwordRegex, value: passwordChange.oldPassword, name: 'password' }
        ])
        .then(() =>
          encrypto({ password: passwordChange.newPassword, salt: salt() })
            .then(pw => resolve({ ...passwordChange, newPassword: pw.password, newSalt: pw.salt }))
            .catch(() => reject(new Error('There is a server error !')))
        )
        .catch((err: CheckReturnValue) => reject(new Error(`There is a validation error (${err.errRegex}) !`)))
    );

  const findOldSalt = (passwordChange: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) =>
      User.findOne({ where: { id: passwordChange.id } })
        .then(data =>
          data.dataValues.id
            ? resolve({
                ...passwordChange,
                oldSalt: data.dataValues.salt
              })
            : reject(new Error('Wrong password !'))
        )
        .catch(err => reject(new Error('Server error !')))
    );

  const encryptoOldPassword = (passwordChange: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) =>
      encrypto({
        password: passwordChange.oldPassword,
        salt: passwordChange.oldSalt
      })
        .then((data: EncryptoPassword) => resolve({ ...passwordChange, oldPassword: data.password }))
        .catch((err: Error) => reject(new Error('There is a server Error !')))
    );

  const updatePassword = (passwordChange: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) =>
      User.update(
        {
          password: passwordChange.newPassword,
          salt: passwordChange.newSalt
        },
        {
          where: {
            password: passwordChange.oldPassword
          }
        }
      )
        .then(() => resolve(passwordChange))
        .catch(err => reject(new Error('Server error !')))
    );

  const createJWT = (passwordChange: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) =>
      jwt
        .createJWT(passwordChange.id, passwordChange.username, passwordChange.email)
        .then((data: string) => resolve({ ...passwordChange, token: data }))
        .catch((err: JsonWebTokenError) => reject(new Error('There is a server error !')))
    );

  const responseToClient = (passwordChange: ChangeUserPassword) => {
    res.json({
      success: true,
      message: 'Change user password success !',
      value: {
        token: passwordChange.token
      }
    });
  };

  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  checkNewPasswordRegex({
    id,
    username,
    email,
    oldPassword,
    oldSalt: '',
    newPassword,
    newSalt: '',
    token: ''
  })
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

  const generateRandomKey = (value: RequestEamilVerifyCode): Promise<RequestEamilVerifyCode> =>
    Promise.resolve({ ...value, randomKey: random.generate({ length: 6, charset: 'alphanumeric', readable: true }) });

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

  const sendMail = (value: RequestEamilVerifyCode): Promise<RequestEamilVerifyCode> => {
    mailer(value.email, value.randomKey)
      .then(() => console.log('Mail send success !'))
      .catch(err => console.log('Mail send failure !', err));
    return Promise.resolve(value);
  };

  const responseToClient = (value: RequestEamilVerifyCode): Response =>
    res.json({
      success: true,
      message: 'Send mail success !'
    });

  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

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

  const responseToClient = (valeu: CheckEmailVerifyCode): Response =>
    res.json({
      success: true,
      message: 'Email verify success !'
    });

  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  compareRandomKey({ randomKey })
    .then(responseToClient)
    .catch(onError);
};
