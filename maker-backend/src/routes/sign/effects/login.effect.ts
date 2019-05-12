import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { createNewPassword, everNullable, neverNullable, reCreatePassword } from '@utils';
import { User } from 'database/models';
import { createUser, getUserByEmail } from 'database/queries';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { checkGoogleIdVaildation, checkSameValueVaildation, createToken } from '../utils';

const loginVaildater$ = requestValidator$({
  body: t.type({
    name: t.string,
    email: t.string,
    googleId: t.string,
    googleIdToken: t.string
  })
});

export const googleLoginEffect$: HttpEffect = req$ => {
  const userEntity = getRepository(User);

  return req$.pipe(
    use(loginVaildater$),
    mergeMap(req =>
      of(req).pipe(
        mergeMap(() => checkGoogleIdVaildation(req.body)),
        map(trans => checkSameValueVaildation(req.body, trans)),
        mergeMap(() =>
          getUserByEmail(
            {
              entity: userEntity
            },
            req.body.email
          )
        ),
        mergeMap(neverNullable),
        map(createToken),
        map(trans => ({
          body: {
            expiresIn: trans.expiresIn,
            token: trans.token,
            message: 'User register completed',
            status: HttpStatus.CREATED
          },
          status: HttpStatus.CREATED
        })),
        catchError((err: HttpError) => throwError(err))
      )
    )
  );
};
