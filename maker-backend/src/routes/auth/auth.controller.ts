import { Request, Response } from 'express';
import Sequelize from 'db';
import { User } from 'db/models';
import { DatabaseError } from 'sequelize';

import lib, { MakeSalt } from 'src/lib';
const { mailer, salt, regex } = lib;

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
        where: Sequelize.or([{ username: value.username }, { email: value.email }])
      })
        .then((data: User) => (data ? new Error(`Duplicate info !`) : resolve(value)))
        .catch((err: DatabaseError) => reject(new Error('User input error !')))
    );

  const passwordEncryption = (value: Register): Promise<Register> => {
    return salt(value.password).then((data: MakeSalt) => {
      return Promise.resolve({ ...value, password: data.password, salt: data.salt });
    });
  };

  const addUser = (value: Register): Promise<Register> => {
    return new Promise((resolve, reject) => {
      const user = User.build({ username: value.username, email: value.email });
      resolve(user);
    });
  };

  const responseToClient = (value: Register) => {
    res.json({
      success: true,
      message: 'Register is succeed !'
    });
  };

  // Error handler
  const onError = (err: Error) => {
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
