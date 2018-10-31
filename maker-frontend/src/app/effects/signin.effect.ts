import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap, pluck } from 'rxjs/operators';
import { SignActions } from '../ngrx/actions';
import { SignIn } from '../ngrx/actions/sign.actions';

@Injectable()
class SignInEffect {
  constructor(private http: HttpClient, private actions$: Actions) {}

  @Effect()
  signIn$: Observable<Action> = this.actions$.pipe(
    ofType(SignActions.SIGN_IN),
    pluck('payload'),
    mergeMap(payload =>
      this.http.post('/api/auth/login', payload).pipe(
        map((data: HttpResponse<JSON>) => ({ type: 'REGISTER_SUCCESS', payload: data })),
        catchError((err: HttpErrorResponse) => of({ type: 'REGISTER_FAILURE', payload: err }))
      )
    )
  );
}

export { SignInEffect };
