import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { MakeSalt } from 'src/lib';

const { Op } = Sequelize;
const { salt, regex } = lib;

/* GET */
// Username, E-mail duplication check function
export const checkDuplication = (req: Request, res: Response): Response => {
  return res.json({
    success: true,
    message: 'Duplication check succeeded !'
  });
};

/* Post */
interface Register {
  username: string;
  email: string;
  password: string;
  salt: string;
}
export const register = (req: Request, res: Response): void => {
  const { username, email, password } = req.body;

  // Value validation check
  const checkRegex = (value: Register): Promise<Register> =>
    regex.usernameRegex.test(value.username) && regex.emailRegex.test(value.email) && regex.passwordRegex.test(value.password)
      ? Promise.resolve(value)
      : Promise.reject(new Error('Validation error !'));

  // Info double check
  const doubleCheck = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      User.findOne({
        where: { [Op.or]: [{ username: value.username }, { email: value.email }] }
      })
        .then((data: User) => {
          console.log(data);
          return data ? reject(new Error(`Duplicate info !`)) : resolve(value);
        })
        .catch((err: DatabaseError) => {
          console.log(err.message);
          reject(new Error('User input error !'));
        })
    );

  // Password encryption
  const passwordEncryption = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      salt(value.password)
        .then((data: MakeSalt) => resolve({ ...value, password: data.password, salt: data.salt }))
        .catch((err: Error) => reject(new Error('Server Error !')))
    );

  // Add user
  const addUser = (value: Register): Promise<Register> => {
    return new Promise((resolve, reject) =>
      User.create({
        username: value.username,
        email: value.email,
        password: value.password,
        salt: value.salt,
        emailVerified: false
      })
        .then((data: User) => (data ? resolve(value) : reject(new Error('Server error !'))))
        .catch((err: DatabaseError) => reject(new Error('Server error !')))
    );
  };

  // Response
  const responseToClient = (value: Register) => {
    res.json({
      success: true,
      message: 'Register is succeed !',
      value: { username: value.username, email: value.email }
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

  // Register
  checkRegex({ username, email, password, salt: '' })
    .then(doubleCheck)
    .then(passwordEncryption)
    .then(addUser)
    .then(responseToClient)
    .catch(onError);
};
