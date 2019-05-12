import { ActionsObservable } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { switchMap, map, filter, pluck, catchError, mergeMap } from 'rxjs/operators';
import { SignActions, SignActionTypes } from '@actions';
import { signUp } from './sign.request';
import { of } from 'rxjs';

export const loginEpic = (actions$: ActionsObservable<SignActions>) =>
  actions$.pipe(
    filter(isOfType(SignActionTypes.LOGIN)),
    pluck('payload'),
    mergeMap(payload => signUp(payload)),
    map(x => ({ type: 'FUCKING' })),
    catchError(err => of({ type: 'SIGN_UP_FAILURE' }))
  );
