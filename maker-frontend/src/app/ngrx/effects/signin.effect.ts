import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SignActions } from 'src/app/ngrx/actions';
import { SignService } from 'src/app/services';

@Injectable()
class SignInEffect {
  constructor(
    private actions$: Actions,
    private sign: SignService,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  @Effect()
  public signIn$: Observable<Action> = this.actions$.pipe(
    ofType<SignActions.SignIn>(SignActions.SIGN_IN),
    map(action => action.payload),
    mergeMap(payload =>
      forkJoin([
        this.sign.signIn(payload.email, payload.password),
        this.translate.get('Sign.in.success'),
        this.translate.get('Sign.in.failure')
      ])
    ),
    map(res => {
      if (res[0].success) {
        localStorage.setItem('token', res[0].value.token); // This value will be filled with response data (token)
        this.router.navigateByUrl('/main');
        this.toast.success(res[1]);
        return new SignActions.SignInSuccess(res[0]);
      } else {
        this.toast.error(res[2]);
        return new SignActions.SignInFailure(undefined);
      }
    }),
    catchError(err => {
      this.toast.error('Unknown error !');
      return of(new SignActions.SignInFailure(undefined));
    })
  );
}

export { SignInEffect };
