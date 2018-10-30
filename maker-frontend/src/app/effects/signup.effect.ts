import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { SignUp } from '../ngrx/actions/sign.actions';

@Injectable()
class RegisterEffect {
  constructor(private http: HttpClient, private actions$: Actions) {}

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType('REGISTER'),
    pluck('payload'),
    mergeMap((action: SignUp) =>
      this.http.post('/api/auth/register', action.payload).pipe(
        map(data => ({ type: 'REGISTER_SUCCESS', payload: data })),
        catchError(err => of({ type: 'REGISTER_FAILURE', payload: err }))
      )
    ),
    map(data => {
      console.log(data);
      return { type: 'REGISTER_SUCCESS', payload: 'wefa' };
    })
  );
}

export { RegisterEffect };
