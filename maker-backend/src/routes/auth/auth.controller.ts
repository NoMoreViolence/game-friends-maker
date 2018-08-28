import { Request, Response } from 'express';
import mailer from 'src/lib';
import { User } from 'db/models';
import { Observable, Subscriber } from 'rxjs';
import { FilteredModelAttributes } from 'sequelize-typescript';

// const Mail = new Observable(observer => {
//   mailer
//     .mailer('ljh000323@naver.com', 'code')
//     .then(res => {
//       observer.next(true);
//     })
//     .catch((err: HttpError) => {
//       console.log(err.message);
//       observer.next(false);
//     });
//   observer.complete();
// });
// Mail.subscribe((data: boolean) => {
//   console.log('hello');
// });
// const Mailer = mailer.mailer('n0rr7882@gmail.com', 'awefawef');

export const CheckEmail = (req: Request, res: Response): Response => {
  const { email } = req.query;

  console.log(req.params);
  console.log(req.headers);

  const EmailCheck = new Observable((observer: Subscriber<User>) => {
    User.findOne({ where: { email } }).then(value => {
      observer.next(value);
    });
  });

  EmailCheck.subscribe((user: User) => {
    console.log(user);
  });

  return res.json({
    success: true
  });
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
