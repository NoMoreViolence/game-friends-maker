import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User, UserGame, AllGame } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as random from 'randomstring';

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

  const checkWhatShouldUpdate = (value: CheckDuplication): Promise<CheckDuplication> =>
    value.what === 'username' || value.what === 'email' ? Promise.resolve(value) : Promise.reject(new Error('There is a wrong request !'));

  const checkValidation = (value: CheckDuplication): Promise<CheckDuplication> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([{ regex: regex[`${value.what}Regex`], value: value.checkvalue, name: value.what }])
        .then(data => (data.result === true ? resolve(value) : reject(new Error('There is no information'))))
    );

  const DoubleCheck = (value: CheckDuplication): Promise<CheckDuplication> =>
    new Promise((resolve, reject) =>
      User.findOne({
        where: { [what]: value.checkvalue }
      })
        .then((data: User) => (data ? reject(new Error(`There is a duplicate information ${value.what} !`)) : resolve(value)))
        .catch((err: DatabaseError) => reject(new Error('There is an user input error !')))
    );

  const responseToClient = (value: CheckDuplication): Response =>
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

  const checkNull = (value: Register): Promise<Register> =>
    typeof value.username === 'string' && typeof value.email === 'string' && typeof value.password === 'string'
      ? Promise.resolve({
          ...value,
          username: value.username.trim(),
          email: value.email.trim(),
          password: value.password.trim()
        })
      : Promise.reject(new Error('There is no data !'));

  const checkPasswordValidation = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([{ regex: value.regex.passwordRegex, value: value.password, name: 'password' }])
        .then(data => (data.result === true ? resolve(value) : reject(new Error('Validation error: (password)'))))
        .catch(err => reject(new Error('There is a server error !')))
    );

  const passwordEncryption = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      encrypto({ password: value.password, salt: salt() })
        .then((data: EncryptoPassword) => resolve({ ...value, password: data.password, salt: data.salt }))
        .catch((err: Error) => reject(new Error('There is a server error !')))
    );

  const addUser = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      User.create({
        username: value.username,
        email: value.email,
        password: value.password,
        salt: value.salt,
        verified: false
      })
        .then((data: User) => (data ? resolve(value) : reject(new Error('There is a server Error !'))))
        .catch((err: DatabaseError) => reject(new Error(err.name)))
    );

  const responseToClient = (value: Register) =>
    res.json({
      success: true,
      message: 'Register success !',
      value: { username: value.username, email: value.email }
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

  const checkValidation = (value: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([
          { regex: regex.emailRegex, value: value.email, name: 'email' },
          { regex: regex.passwordRegex, value: value.password, name: 'password' }
        ])
        .then(data => {
          data.result === true ? resolve(value) : reject(new Error(`There is a validation error (${data.errRegex}) ! `));
        })
    );

  const findData = (value: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      User.findOne({ where: { email: value.email } })
        .then((user: User) =>
          user
            ? resolve({ ...value, id: user.id, username: user.username, hashedPassword: user.password, salt: user.salt })
            : reject(new Error('There is no user data that have request email !'))
        )
        .catch((err: DatabaseError) => reject(new Error('There is no user data that have request email !')))
    );

  const passwordEncryption = (value: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      encrypto({ password: value.password, salt: value.salt })
        .then((data: EncryptoPassword) => resolve({ ...value, password: data.password }))
        .catch((err: Error) => reject(new Error('There is a server Error !')))
    );

  const compareData = (value: Login): Promise<Login> =>
    value.password === value.hashedPassword ? Promise.resolve(value) : Promise.reject(new Error('There is a password error !'));

  const createJWT = (value: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      jwt
        .createJWT(value.id, value.username, value.email)
        .then((data: string) => resolve({ ...value, token: data }))
        .catch((err: JsonWebTokenError) => reject(new Error('Server error !')))
    );

  const responseToClient = (value: Login) => {
    res.cookie('accessToken', { token: value.token }, { maxAge: 2628000 * 2, httpOnly: true });
    res.json({
      success: true,
      message: 'Login success !',
      value: {
        admin: value.id === 1 ? true : false,
        username: value.username,
        email: value.email,
        token: value.token
      }
    });
  };

  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  checkValidation({ id: -1, username: '', email, password, hashedPassword: '', salt: '', token: '' })
    .then(findData)
    .then(passwordEncryption)
    .then(compareData)
    .then(createJWT)
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

  const destoryAccount = (value: Withdraw): Promise<Withdraw> =>
    new Promise((resolve, reject) =>
      User.destroy({
        where: { id }
      })
        .then(data => resolve(value))
        .catch((err: DatabaseError) => reject(new Error('There is a database error !')))
    );

  const responseToClient = (value: Withdraw): Response =>
    res.json({
      success: true,
      message: 'Withdraw success ! good bye.'
    });

  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  destoryAccount({ id })
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
  const { what } = req.params; // username or email, gives direction what has to be change
  const { username, email, id } = res.locals; // decoded token value, same as databases username and email
  const { newThing } = req.body; // new change value, it could be username or email

  // type Check
  const typeCheck = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    typeof value.newThing === 'string' ? Promise.resolve({ ...value, newThing: value.newThing.trim() }) : Promise.reject(new Error(''));

  // 'what' params is valid check
  const checkWhatShouldUpdate = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    value.what === 'username' || value.what === 'email'
      ? Promise.resolve(value)
      : Promise.reject(new Error('There is wrong api request !'));

  // 'duplicate' check
  const checkDuplicate = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    value.newThing === value[what] ? Promise.reject(new Error('There is a duplicate check error !')) : Promise.resolve(value);

  // Update
  const updateThing = (value: ChangeUserInfo): Promise<ChangeUserInfo> =>
    new Promise((resolve, reject) =>
      User.update({ [value.what]: value.newThing }, { where: { [value.what]: value[value.what] } })
        .then(() => resolve(value))
        .catch((err: DatabaseError) => reject(new Error(err.name)))
    );

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

  // Regex check + new password encryption
  const checkNewPasswordRegex = (value: ChangeUserPassword): Promise<ChangeUserPassword> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([
          { regex: regex.passwordRegex, value: value.newPassword, name: 'password' },
          { regex: regex.passwordRegex, value: value.oldPassword, name: 'password' }
        ])
        .then(data =>
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
