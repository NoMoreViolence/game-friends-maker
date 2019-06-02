import { ActionsObservable } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { of } from 'rxjs';
import {
  filter, pluck, catchError, mergeMap, switchMap,
} from 'rxjs/operators';
import {
  SignActions,
  RegisterFailure,
  Login,
  RegisterSuccess,
  GetMyInfo,
  LoginFailure,
  LoginSuccess,
  GetMyInfoFailure,
  GetMyInfoSuccess,
  SignActionTypes,
} from '@actions';
import { push } from 'connected-react-router';
import { toast, pureObject } from '@lib';
import { register, login, getMyInfo } from './sign.request';

export const registerEpic$ = (actions$: ActionsObservable<SignActions>) =>
  actions$.pipe(
    filter(isOfType(SignActionTypes.REGISTER)),
    pluck('payload'),
    mergeMap(payload =>
      of(payload).pipe(
        mergeMap(register),
        switchMap((response) => {
          if (response.error === true && response.status === 409) {
            return [pureObject(new RegisterFailure()), pureObject(new Login(payload))];
          }

          if (response.error === true) {
            return [pureObject(new RegisterFailure())];
          }

          return [
            pureObject(new RegisterSuccess({ token: response.token, expiresIn: response.expiresIn })),
            pureObject(new GetMyInfo(response)),
          ];
        }),
      )),
    catchError(() => of(pureObject(new RegisterFailure()))),
  );

export const loginEpic$ = (actions$: ActionsObservable<SignActions>) =>
  actions$.pipe(
    filter(isOfType(SignActionTypes.LOGIN)),
    pluck('payload'),
    mergeMap(payload =>
      of(payload).pipe(
        mergeMap(login),
        switchMap((response) => {
          if (response.error === true) {
            return [pureObject(new LoginFailure())];
          }

          return [
            pureObject(new LoginSuccess({ token: response.token, expiresIn: response.expiresIn })),
            pureObject(new GetMyInfo({ token: response.token })),
          ];
        }),
      )),
    catchError(() => of(pureObject(new LoginFailure()))),
  );

export const getMyInfoEpic$ = (actions$: ActionsObservable<SignActions>) =>
  actions$.pipe(
    filter(isOfType(SignActionTypes.GET_MY_INFO)),
    pluck('payload'),
    mergeMap(payload =>
      of(payload).pipe(
        mergeMap(getMyInfo),
        switchMap((response) => {
          if (response.error === true && response.status === 401) {
            toast('error', '인증 해제됨', '재 로그인해 주세요.');
            return [pureObject(new GetMyInfoFailure()), { type: 'RESET' }, push('/')];
          }

          if (response.error === true) {
            return [pureObject(new GetMyInfoFailure()), { type: 'RESET' }, push('/')];
          }

          return [
            pureObject(
              new GetMyInfoSuccess({
                email: response.user.email,
                name: response.user.name,
              }),
            ),
            push('/posts'),
          ];
        }),
      )),
  );
