import { ActionsObservable } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { of } from 'rxjs';
import {
  filter, pluck, catchError, mergeMap, switchMap, debounceTime,
} from 'rxjs/operators';
import {
  PostActionTypes, SearchPostFailure, SearchPostSuccess, PostActions,
} from '@actions';
import { push } from 'connected-react-router';
import { toast, pureObject } from '@lib';
import { search } from './search-post.request';

export const searchPost$ = (actions$: ActionsObservable<PostActions>) =>
  actions$.pipe(
    filter(isOfType(PostActionTypes.SEARCH_POST)),
    pluck('payload'),
    debounceTime(300),
    mergeMap(payload =>
      of(payload).pipe(
        mergeMap(search),
        switchMap((response) => {
          if (response.error === true && response.status === 409) {
            return [pureObject(new SearchPostFailure())];
          }

          if (response.error === true) {
            return [pureObject(new SearchPostFailure())];
          }

          return [pureObject(new SearchPostSuccess(response))];
        }),
      )),
    catchError(() => of(pureObject(new SearchPostFailure()))),
  );
