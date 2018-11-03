import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { SignUp } from '../actions/sign.actions';

@Injectable()
class RegisterEffect {
  constructor(private http: HttpClient, private actions$: Actions) {}

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType('Fuck You'),
    pluck('payload'),
    mergeMap((action: SignUp) =>
      this.http.post('/api/auth/register', action.payload).pipe(
        map((data: HttpResponse<JSON>) => ({ type: 'REGISTER_SUCCESS', payload: data })),
        catchError((err: HttpErrorResponse) => of({ type: 'REGISTER_FAILURE', payload: err }))
      )
    )
  );
}

export { RegisterEffect };
