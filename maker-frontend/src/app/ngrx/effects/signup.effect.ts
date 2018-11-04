import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SignActions } from 'src/app/ngrx/actions';
import { Omit, HttpSuccess } from 'src/app/interface';

@Injectable()
class SignUpEffect {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType<SignActions.ActionSignUp>(SignActions.SIGN_UP),
    map(action => action.payload),
    mergeMap(payload =>
      this.http.post('/api/auth/register', payload).pipe(
        map((data: Omit<HttpSuccess, 'value'> & { value: { username: string; email: string } }) => {
          combineLatest(this.router.navigateByUrl('/main'), this.translate.get('Sign.up.success'), (route, comment) => {
            this.toast.success(comment);
          }).subscribe();
          return { type: 'SIGN_UP_SUCCESS', payload: data };
        }),
        catchError((err: HttpErrorResponse) => {
          this.translate.get('Sign.up.failure').subscribe(comment => this.toast.error(comment));
          return of({ type: 'SIGN_UP_FAILURE', payload: err });
        })
      )
    )
  );
}

export { SignUpEffect };
