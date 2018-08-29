import { Request, Response } from 'express';
import lib from 'src/lib';
import * as models from 'db/models';
import Sequelize from 'db';

const { User } = models;
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
  salt: number;
}
export const register = (req: Request, res: Response): void => {
  const { username, email, password } = req.body;

  // Value validation check
  const checkRegex = (value: Register): Promise<Register> =>
    regex.usernameRegex.test(value.username) && regex.emailRegex.test(value.email) && regex.passwordRegex.test(value.password)
      ? Promise.resolve(value)
      : Promise.reject(new Error('Validation error !'));

  const doubleCheck = async (value: Register): Promise<Register> => {
    const [checkUsername, checkEmail] = await Promise.all([
      User.findOne({ where: Sequelize.or([{ username: value.username }, { email: value.email }]) })
    ]);

    return checkUsername && checkEmail ? Promise.resolve(checkUsername) : Promise.reject(new Error(''));
  };

  const passwordEncryption = (value: Register): Promise<Register> => {
    return Promise.resolve(value);
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
  checkRegex({ username, email, password, salt: 0 })
    .then(doubleCheck)
    .then(passwordEncryption)
    .then(addUser)
    .then(responseToClient)
    .catch(onError);
};
