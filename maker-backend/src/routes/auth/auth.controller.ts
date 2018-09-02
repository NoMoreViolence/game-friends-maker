import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword } from 'src/lib';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

/* GET
  Query: {
    username: string
    email: string
  }
*/
interface CheckDuplication {
  regex: { usernameRegex: RegExp; emailRegex: RegExp; passwordRegex: RegExp };
  username: string;
  email: string;
}
// Username, E-mail duplication check function
export const checkDuplication = (req: Request, res: Response): void => {
  const { username, email } = req.query;

  // Validation check
  const checkValidation = (value: CheckDuplication): Promise<CheckDuplication> =>
    validation.checkValidationSome(
      [{ regex: regex.usernameRegex, value: value.username }, { regex: regex.emailRegex, value: value.email }]
    ) === true
      ? Promise.resolve(value)
      : Promise.reject(new Error('There is a validation error !'));

  // User find
  const DoubleCheck = (value: CheckDuplication): Promise<CheckDuplication> =>
    new Promise((resolve, reject) =>
      User.findOne({
        where: { [Op.or]: [{ username: value.username }, { email: value.email }] }
      })
        .then((data: User) => (data ? reject(new Error(`There is a duplicate infomation !`)) : resolve(value)))
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
    res.json({
      success: false,
      message: err.message
    });

  // Promise
  checkValidation({ username, email, regex })
    .then(DoubleCheck)
    .then(responseToClient)
    .catch(onError);
};

/* Post 
  body: {
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

  // Value validation check
  const checkValidation = (value: Register): Promise<Register> =>
    validation.checkValidationAll(
      [
        { regex: value.regex.usernameRegex, value: value.username },
        { regex: value.regex.emailRegex, value: value.email },
        { regex: value.regex.passwordRegex, value: value.password }
      ]
    ) === true
      ? Promise.resolve(value)
      : Promise.reject(new Error('There is a validation error !'));

  // Info double check
  const doubleCheck = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      User.findOne({
        where: { [Op.or]: [{ username: value.username }, { email: value.email }] }
      })
        .then((data: User) => (data ? reject(new Error(`There is a duplicate infomation !`)) : resolve(value)))
        .catch((err: DatabaseError) => reject(new Error('There is an user input error !')))
    );

  // Password encryptio
  const passwordEncryption = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      encrypto({ password: value.password, salt: salt() })
        .then((data: EncryptoPassword) => resolve({ ...value, password: data.password, salt: data.salt }))
        .catch((err: Error) => reject(new Error('There is a server Error !')))
    );

  // Add user
  const addUser = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      User.create({
        username: value.username,
        email: value.email,
        password: value.password,
        salt: value.salt,
        emailVerified: false
      })
        .then((data: User) => (data ? resolve(value) : reject(new Error('There is a server Error !'))))
        .catch((err: DatabaseError) => reject(new Error('There is a server Error !')))
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
  checkValidation({ regex, username, email, password, salt: '' })
    .then(doubleCheck)
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
}
export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Value validation check
  const checkValidation = (value: Login): Promise<Login> =>
    validation.checkValidationAll(
      [{ regex: regex.emailRegex, value: value.email }, { regex: regex.passwordRegex, value: value.password }]
    ) === true
      ? Promise.resolve(value)
      : Promise.reject(new Error('There is a validation error !'));

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
  const createJWT = (value: Login): Promise<string> => Promise.resolve(jwt.createJWT(value.id, value.username, value.email));

  // Response
  const responseToClient = (value: string) => {
    res.cookie('accessToken', { token: value }, { maxAge: 2628000 * 2, httpOnly: true });
    res.json({
      success: true,
      message: 'Login success !'
    });
  };

  // Error handler
  const onError = (err: Error) => {
    console.log(err.message);
    res.status(409).json({
      success: false,
      message: err.message
    });
  };

  // Promise
  checkValidation({ id: -1, username: '', email, password, hashedPassword: '', salt: '' })
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
  const { tokenValue } = req.body;

  res.json({
    success: true,
    message: 'Token access success !',
    value: {
      username: tokenValue.username,
      email: tokenValue.email
    }
  });
};
