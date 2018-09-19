import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User, Game, AllGame } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

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
// Username, E-mail duplication check function
export const checkDuplication = (req: Request, res: Response): void => {
  const { what } = req.params;
  const { checkvalue } = req.query;

  const checkWhatShouldUpdate = (value: CheckDuplication): Promise<CheckDuplication> =>
    value.what === 'username' || value.what === 'email'
      ? Promise.resolve(value)
      : Promise.reject(new Error('There is a wrong request !'));

  // Validation check
  const checkValidation = (value: CheckDuplication): Promise<CheckDuplication> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([{ regex: regex[`${value.what}Regex`], value: value.checkvalue, name: value.what }])
        .then(data => (data.result === true ? resolve(value) : reject(new Error('There is no information'))))
    );

  // User find
  const DoubleCheck = (value: CheckDuplication): Promise<CheckDuplication> =>
    new Promise((resolve, reject) =>
      User.findOne({
        where: { [what]: value.checkvalue }
      })
        .then((data: User) => (data ? reject(new Error(`There is a duplicate information ${value.what} !`)) : resolve(value)))
        .catch((err: DatabaseError) => reject(new Error('There is an user input error !')))
    );

  // Response to client
  const responseToClient = (value: CheckDuplication): Response =>
    res.json({
      success: true,
      message: 'DoubleCheck success !'
    });

  //  Error handler
  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
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

  // Null check
  const checkNull = (value: Register): Promise<Register> =>
    value.username !== null &&
    value.username !== undefined &&
    typeof value.username === 'string' &&
    value.email !== null &&
    value.email !== undefined &&
    typeof value.email === 'string' &&
    value.password !== null &&
    value.password !== undefined &&
    typeof value.password === 'string'
      ? Promise.resolve({
          ...value,
          username: value.username.trim(),
          email: value.email.trim(),
          password: value.password.trim()
        })
      : Promise.reject(new Error('There is no data !'));

  // Password validation check
  const checkPasswordValidation = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      validation
        .checkValidationAll([{ regex: value.regex.passwordRegex, value: value.password, name: 'password' }])
        .then(data => (data.result === true ? resolve(value) : reject(new Error(`Validation error: (password)`))))
        .catch(err => reject(new Error('There is a server error !')))
    );

  // Password encryptio
  const passwordEncryption = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      encrypto({ password: value.password, salt: salt() })
        .then((data: EncryptoPassword) => resolve({ ...value, password: data.password, salt: data.salt }))
        .catch((err: Error) => reject(new Error('There is a server error !')))
    );

  // Add user
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
        .catch((err: DatabaseError) => reject(new Error(err.message)))
    );

  // Response
  const responseToClient = (value: Register) =>
    // res.cookie('hello', 'helo', { httpOnly: true });
    res.json({
      success: true,
      message: 'Register success !',
      value: { username: value.username, email: value.email }
    });

  // Error handler
  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
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

  // Value validation check
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

  // Find salt value
  const findData = (value: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      User.findOne({ where: { email: value.email } })
        .then(
          (data: User) =>
            data
              ? resolve({ ...value, id: data.id, username: data.username, hashedPassword: data.password, salt: data.salt })
              : reject(new Error('There is no user data that have request email !'))
        )
        .catch((err: DatabaseError) => reject(new Error('There is a server error !')))
    );

  // Password encryption
  const passwordEncryption = (value: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      encrypto({ password: value.password, salt: value.salt })
        .then((data: EncryptoPassword) => resolve({ ...value, password: data.password }))
        .catch((err: Error) => reject(new Error('There is a server Error !')))
    );

  // Password compare
  const compareData = (value: Login): Promise<Login> =>
    value.password === value.hashedPassword ? Promise.resolve(value) : Promise.reject(new Error('There is a password error !'));

  // Create jwt token
  const createJWT = (value: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      jwt
        .createJWT(value.id, value.username, value.email)
        .then((data: string) => resolve({ ...value, token: data }))
        .catch((err: JsonWebTokenError) => reject(new Error('Server error !')))
    );

  // Response
  const responseToClient = (value: Login) => {
    res.cookie('accessToken', { token: value.token }, { maxAge: 2628000 * 2, httpOnly: true });
    res.json({
      success: true,
      message: 'Login success !',
      value: {
        admin: value.id === 1 ? true : false,
        username: value.username,
        email: value.email
      }
    });
  };

  // Error handler
  const onError = (err: Error) =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
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
  const { username, email } = res.locals;

  res.json({
    success: true,
    message: 'Token access success !',
    value: {
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
        where: { id },
        individualHooks: true,
        hooks: true
      })
        .then(data => {
          console.log(data);
          resolve(value);
        })
        .catch((err: DatabaseError) => {
          console.log('awejfoiuwaefhiau');
          // console.log(err);
          console.log(err.name);
          console.log(err.message);
          reject(new Error('There is a database error !'));
        })
    );

  // Response
  const responseToClient = (value: Withdraw): Response =>
    res.json({
      success: true,
      message: 'Withdraw success ! good bye.'
    });

  // Error handler
  const onError = (err: Error): Response =>
    res.status(409).json({
      success: false,
      message: err.message
    });

  // Promise
  destoryAccount({ id })
    .then(responseToClient)
    .catch(onError);
};

setTimeout(() => {
  Game.findOne({ where: { id: 2 } })
    .then(data => console.log(data))
    .catch(err => console.log(err.message));
}, 3000);
