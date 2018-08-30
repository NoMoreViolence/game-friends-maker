import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword } from 'src/lib';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt } = lib;

/* GET */
// Username, E-mail duplication check function
export const checkDuplication = (req: Request, res: Response): Response =>
  res.json({
    success: true,
    message: 'Duplication check succeeded !'
  });

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
  const checkValidation = (value: Register): Promise<Register> =>
    validation(
      [
        { regex: regex.usernameRegex, value: value.username },
        { regex: regex.emailRegex, value: value.email },
        { regex: regex.passwordRegex, value: value.password }
      ]
    ) === true
      ? Promise.resolve(value)
      : Promise.reject(new Error('Validation error !'));

  // regex.usernameRegex.test(value.username) && regex.emailRegex.test(value.email) && regex.passwordRegex.test(value.password)
  //   ? Promise.resolve(value)
  //   : Promise.reject(new Error('Validation error !'));

  // Info double check
  const doubleCheck = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      User.findOne({
        where: { [Op.or]: [{ username: value.username }, { email: value.email }] }
      })
        .then((data: User) => (data ? reject(new Error(`Duplicate info !`)) : resolve(value)))
        .catch((err: DatabaseError) => reject(new Error('User input error !')))
    );

  // Password encryptio
  const passwordEncryption = (value: Register): Promise<Register> =>
    new Promise((resolve, reject) =>
      encrypto({ password: value.password, salt: salt() })
        .then((data: EncryptoPassword) => resolve({ ...value, password: data.password, salt: data.salt }))
        .catch((err: Error) => reject(new Error('Server Error !')))
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
        .then((data: User) => (data ? resolve(value) : reject(new Error('Server error !'))))
        .catch((err: DatabaseError) => reject(new Error('Server error !')))
    );

  // Response
  const responseToClient = (value: Register) => {
    // res.cookie('hello', 'helo', { httpOnly: true });
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
  checkValidation({ username, email, password, salt: '' })
    .then(doubleCheck)
    .then(passwordEncryption)
    .then(addUser)
    .then(responseToClient)
    .catch(onError);
};

/* POST */
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
    validation([{ regex: regex.emailRegex, value: value.email }, { regex: regex.passwordRegex, value: value.password }]) === true
      ? Promise.resolve(value)
      : Promise.reject(new Error('Validation error !'));

  // Find salt value
  const findData = (value: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      User.findOne({ where: { email: value.email } })
        .then(
          (data: User) =>
            data
              ? resolve({ ...value, username: data.username, hashedPassword: data.password, salt: data.salt })
              : reject(new Error('Wrong email !'))
        )
        .catch((err: DatabaseError) => reject(new Error('Server error !')))
    );

  // Password encryption
  const passwordEncryption = (value: Login): Promise<Login> =>
    new Promise((resolve, reject) =>
      encrypto({ password: value.password, salt: value.salt })
        .then((data: EncryptoPassword) => resolve({ ...value, password: data.password }))
        .catch((err: Error) => reject(new Error('Server Error !')))
    );

  // Password compare
  const compareData = (value: Login): Promise<Login> =>
    value.password === value.hashedPassword ? Promise.resolve(value) : Promise.reject(new Error('Wrong password !'));

  // Create jwt token
  const createJWT = (value: Login): Promise<string> => Promise.resolve(jwt.createJWT(value.id, value.username, value.email));

  // Response
  const responseToClient = (value: string) => {
    res.cookie('helloMotherFucker', { token: value }, { maxAge: 2628000 * 2, httpOnly: true });
    res.json({
      success: true,
      message: 'Login is succeed !'
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

  checkValidation({ id: -1, username: '', email, password, hashedPassword: '', salt: '' })
    .then(findData)
    .then(passwordEncryption)
    .then(compareData)
    .then(createJWT)
    .then(responseToClient)
    .catch(onError);
};

/* POST */
// export const findEmail = (req, res) => {};
