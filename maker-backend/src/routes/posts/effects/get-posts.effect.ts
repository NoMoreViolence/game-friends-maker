import { Post } from '@database/models';
import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { optional } from '@utils';
import { getPosts } from 'database/queries';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';

const getPostVaildator$ = requestValidator$({
  body: t.type({
    searchInput: optional(t.string),
    game: optional(t.array(t.string)),
    offset: t.number,
    limit: t.number
  })
});

export const getPostsEffect$: HttpEffect = req$ => {
  const postEntity = getRepository(Post);

  return req$.pipe(
    use(getPostVaildator$),
    mergeMap(req =>
      of(req).pipe(
        mergeMap(() =>
          getPosts(
            {
              entity: postEntity
            },
            req.body,
            { skip: req.body.offset, take: req.body.offset }
          )
        ),
        map(([raws, count]: [Post[], number]) => ({
          body: {
            raws,
            count,
            message: 'Get posts success',
            status: HttpStatus.OK
          },
          status: HttpStatus.OK
        })),
        catchError((err: HttpError) => throwError(err))
      )
    )
  );
};
