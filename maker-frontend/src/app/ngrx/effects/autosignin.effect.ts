import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, map, mergeMap, tap, pluck } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SignActions } from '../actions';

@Injectable()
class AutoSignInEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  @Effect()
  signIn$: Observable<Action> = this.actions$.pipe(
    ofType(SignActions.AUTO_SIGN_IN),
    pluck('payload'),
    mergeMap(payload =>
      this.http
        .post(
          '/api/auth/check',
          {},
          {
            headers: {
              jwttoken: payload as string
            }
          }
        )
        .pipe(
          tap(data => console.log(data)),
          map((data: { message: string; success: boolean; value: { admin: boolean; email: string; username: string } }) => {
            combineLatest(this.router.navigateByUrl('/main'), this.translate.get('Sign.in.success'), (route, comment) =>
              this.toast.success(comment)
            ).subscribe();
            return { type: SignActions.AUTO_SIGN_IN_SUCCESS, payload: data };
          }),
          catchError((err: HttpErrorResponse) => {
            localStorage.removeItem('token');
            combineLatest(this.router.navigateByUrl('/sign/in'), this.translate.get('Sign.in.failure'), (route, comment) =>
              this.toast.error(comment)
            ).subscribe();
            return of({ type: SignActions.AUTO_SIGN_IN_FAILURE, payload: err });
          })
        )
    )
  );
}

export { AutoSignInEffect };
