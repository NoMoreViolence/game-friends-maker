import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, map, mergeMap, tap, pluck } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SignActions } from '../actions';

@Injectable()
class SignInEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  @Effect()
  signIn$: Observable<Action> = this.actions$.pipe(
    ofType(SignActions.SIGN_IN),
    pluck('payload'),
    mergeMap(payload =>
      this.http.post('/api/auth/login', payload).pipe(
        map((data: HttpResponse<JSON>) => {
          localStorage.setItem('logined', 'true');
          combineLatest(this.router.navigateByUrl('/main'), this.translate.get('Sign.in.success'), (route, comment) =>
            this.toast.success(comment)
          ).subscribe();
          return { type: 'SIGN_IN_SUCCESS', payload: data };
        }),
        catchError((err: HttpErrorResponse) => {
          this.translate.get('Sign.in.failure').subscribe(comment => this.toast.error(comment));
          return of({ type: 'SIGN_IN_SUCCESS', payload: err });
        })
      )
    )
  );
}

export { SignInEffect };
