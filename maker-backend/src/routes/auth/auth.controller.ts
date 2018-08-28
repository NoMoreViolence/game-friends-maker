import { Request, Response } from 'express';
import { FilteredModelAttributes } from 'sequelize-typescript';
import { DatabaseError } from 'sequelize';
import { User, Email } from 'db/models';
import { Observable, Subscriber } from 'rxjs';
import lib from 'src/lib';
const { mailer, salt, regex } = lib;

interface CheckEmail {
  email: string;
  username: string;
  AuthCode: number;
}
export const CheckEmail = (req: Request, res: Response): Response | any => {
  const { email, username } = req.query;

  const checkEmail = (value: CheckEmail): Promise<CheckEmail> | any =>
    value.email
      ? regex.emailRegex.test(value.email)
        ? Promise.resolve(value)
        : Promise.reject(new Error('Not formatted'))
      : Promise.reject(new Error('No email data here !'));

  const findEmail = (value: CheckEmail): Promise<CheckEmail> =>
    new Promise((resolve, reject) => {
      User.findOne({ where: { email: value.email } })
        .then((data: User) => {
          if (data) {
            return reject(new Error('Duplicate Email !'));
          }
          return resolve(value);
        })
        .catch((err: DatabaseError) => {
          return reject(new Error('Database Error !'));
        });
    });

  const createEmailQuery = (value: CheckEmail) =>
    new Promise((resolve, rject) => {
      Email.upsert({ email: value.email });
    });

  const sendMail = (value: CheckEmail) => {};

  const returnToClient = (value: CheckEmail) => {
    res.json({
      success: true,
      message: 'First email checking is valid !',
      email: value.email
    });
  };

  const onError = (err: Error) => {
    res.status(409).json({
      success: false,
      message: err.message
    });
  };

  checkEmail({ email, username, AuthCode: 0 })
    .then(findEmail)
    .catch(onError);
};

// setTimeout(() => {
//   User.create({
//     username: 'awedwdfqwdqwdawef',
//     password: 'awjefwdqwdqwdwdwdioawef',
//     email: 'awefjawwdqwdqwdwdef',
//     salt: 1231112
//   })
//     .then(res => console.log(res.dataValues))
//     .catch(err => console.log(err.message));
// }, 1000);

// setTimeout(async () => {
//   await User.create({
//     username: 'awefawef',
//     password: 'awjefioawef',
//     email: 'awefjawef',
//     salt: 123
//   });

//   User.findOne({
//     where: {
//       username: 'awefawef'
//     }
//   })
//     .then(res => {
//       console.log(res.dataValues);
//       console.log('찾았다');
//     })
//     .catch(err => {
//       console.log(err);
//       console.log('아니다');
//     });
// }, 1000);
