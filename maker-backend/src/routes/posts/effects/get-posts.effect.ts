import { Post } from '@database/models';
import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { optional } from '@utils';
import { getPosts } from 'database/queries';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';

const getPostVaildator$ = requestValidator$({
  query: t.type({
    searchInput: optional(t.string),
    game: optional(t.union([t.array(t.string), t.string])),
    offset: t.string,
    limit: t.string
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
            {
              ...req.query,
              game: req.query.game ? (Array.isArray(req.query.game) ? req.query.game : [req.query.game]) : []
            },
            { skip: Number(req.query.offset), take: Number(req.query.offset) }
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
