import { ActionsObservable } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { of } from 'rxjs';
import { filter, pluck, catchError, mergeMap, switchMap } from 'rxjs/operators';
import {
  SignActions,
  SignActionTypes,
  IRegisterSuccess,
  IRegisterFailure,
  ILoginFailure,
  ILoginSuccess,
  ILogin,
  IGetMyInfo
} from '@actions';
import { register, login } from './sign.request';

export const registerEpic$ = (actions$: ActionsObservable<SignActions>) =>
  actions$.pipe(
    filter(isOfType(SignActionTypes.REGISTER)),
    pluck('payload'),
    mergeMap(payload =>
      of(payload).pipe(
        mergeMap(register),
        switchMap(response => {
          if (response.error === true && response.status === 409) {
            return [{ type: 'REGISTER_FAILURE' } as IRegisterFailure, { type: 'LOGIN', payload } as ILogin];
          }

          if (response.error === true) {
            return [{ type: 'REGISTER_FAILURE' } as IRegisterFailure];
          }

          return [
            {
              type: 'REGISTER_SUCCESS',
              payload: { token: response.token, expiresIn: response.expiresIn }
            } as IRegisterSuccess,
            {
              type: 'GET_MY_INFO',
              payload: response
            }
          ];
        })
      )
    ),
    catchError(() => of({ type: 'REGISTER_FAILURE' } as IRegisterFailure))
  );

export const loginEpic$ = (actions$: ActionsObservable<SignActions>) =>
  actions$.pipe(
    filter(isOfType(SignActionTypes.LOGIN)),
    pluck('payload'),
    mergeMap(payload =>
      of(payload).pipe(
        mergeMap(login),
        switchMap(response => {
          if (response.error === true) {
            return [{ type: 'LOGIN_FAILURE' } as ILoginFailure];
          }

          return [
            {
              type: 'LOGIN_SUCCESS',
              payload: { token: response.token, expiresIn: response.expiresIn }
            } as ILoginSuccess,
            {
              type: 'GET_MY_INFO',
              payload: { token: response.token }
            } as IGetMyInfo
          ];
        })
      )
    ),
    catchError(() => of({ type: 'LOGIN_FAILURE' } as ILoginFailure))
  );
