import { User } from '@database/models';
import { HttpEffect, HttpError, HttpStatus } from '@marblejs/core';
import { getUserByUserId } from 'database/queries';
import { of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';

export const tokenCheckEffect$: HttpEffect = req$ => {
  const userEntity = getRepository(User);

  return req$.pipe(
    mergeMap(req =>
      of(req).pipe(
        mergeMap(() =>
          getUserByUserId(
            {
              entity: userEntity
            },
            req.user.userId,
            {
              select: ['name', 'email', 'id']
            }
          )
        ),
        mergeMap(trans =>
          of({
            body: {
              message: 'Get user info success',
              status: HttpStatus.OK,
              user: trans
            },
            status: HttpStatus.OK
          })
        ),
        catchError((err: HttpError) => throwError(err))
      )
    )
  );
};
