import { ActionsObservable, combineEpics } from 'redux-observable';
import { push } from 'connected-react-router';
import { of } from 'rxjs';
import { map, pluck, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { HttpStatus } from 'store/models';
import { userActions, globalActions } from 'store/reducers';
import { error401Toast, error500Toast, error400Toast } from 'lib';
import { registerRequest, loginRequest, getMyInfoRequest } from './landing.request';

const RegisterType = userActions.register.type;
type Register = ReturnType<typeof userActions.register>;
const registerEpic$ = (action$: ActionsObservable<Register>) =>
  action$.ofType(RegisterType).pipe(
    pluck('payload'),
    mergeMap(payload =>
      of(payload).pipe(
        mergeMap(registerRequest),
        switchMap(res => {
          if (res.error && res.status === HttpStatus.CONFLICT) {
            return [userActions.registerFailure(), userActions.login(payload)];
          }

          if (res.error) {
            return [userActions.registerFailure(), error400Toast()];
          }

          return [
            userActions.registerSuccess(res),
            globalActions.toast({
              type: 'success',
              title: 'register.success.title',
              text: [{ id: 'register.success.text' }, { name: payload.name }],
            }),
          ];
        }),
        catchError(() => [userActions.registerFailure(), error500Toast()]),
      ),
    ),
  );

const LoginType = userActions.login.type;
type Login = ReturnType<typeof userActions.login>;
const loginEpic$ = (action$: ActionsObservable<Login>) =>
  action$.ofType(LoginType).pipe(
    pluck('payload'),
    mergeMap(payload =>
      of(payload).pipe(
        mergeMap(loginRequest),
        switchMap(res => {
          if (res.status === HttpStatus.BAD_REQUEST || res.status === HttpStatus.UNAUTHORIZED) {
            return [userActions.loginFailure(), error400Toast()];
          }

          if (res.error) {
            return [userActions.loginFailure(), error400Toast()];
          }

          localStorage.setItem('token', res.token);
          return [
            userActions.loginSuccess(res),
            globalActions.toast({
              type: 'success',
              title: [{ id: 'login.success.title' }, { name: payload.name }],
              text: 'login.success.text',
            }),
          ];
        }),
        catchError(() => [userActions.loginFailure(), error500Toast()]),
      ),
    ),
  );

const RegisterSuccessType = userActions.registerSuccess.type;
const LoginSuccessType = userActions.loginSuccess.type;
type RegisterSuccess = ReturnType<typeof userActions.registerSuccess>;
type LoginSuccess = ReturnType<typeof userActions.loginSuccess>;
const afterLoginAndRegisterEpic$ = (action$: ActionsObservable<LoginSuccess | RegisterSuccess>) =>
  action$.ofType(RegisterSuccessType || LoginSuccessType).pipe(
    pluck('payload'),
    map(payload => userActions.getMyInfo(payload)),
  );

const GetMyInfoType = userActions.getMyInfo.type;
type GetMyInfo = ReturnType<typeof userActions.getMyInfo>;
const getMyInfoEpic$ = (action$: ActionsObservable<GetMyInfo>) =>
  action$.ofType(GetMyInfoType).pipe(
    pluck('payload'),
    mergeMap(payload =>
      of(payload).pipe(
        mergeMap(getMyInfoRequest),
        switchMap(res => {
          console.log(res);
          if (res.status === HttpStatus.UNAUTHORIZED) {
            return [userActions.getMyInfoFailure(), userActions.logout(), error401Toast()];
          }

          if (res.status === HttpStatus.BAD_REQUEST) {
            return [userActions.getMyInfoFailure(), error400Toast()];
          }

          if (res.error) {
            return [userActions.getMyInfoFailure(), error500Toast()];
          }

          return [userActions.getMyInfoSuccess({ value: res.value })];
        }),
        catchError(() => [userActions.getMyInfoFailure(), error500Toast()]),
      ),
    ),
  );

const LogoutType = userActions.logout.type;
type Logout = ReturnType<typeof userActions.logout>;
const logoutEpic$ = (action$: ActionsObservable<Logout>) => action$.ofType(LogoutType).pipe(map(() => push('/')));

export const landingEpics$ = combineEpics(
  loginEpic$,
  registerEpic$,
  afterLoginAndRegisterEpic$,
  getMyInfoEpic$,
  logoutEpic$,
);
