import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SignActions } from '../actions';
import { SignService } from 'src/app/services';

@Injectable()
class AutoSignInEffect {
  constructor(
    private actions$: Actions,
    private sign: SignService,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  @Effect()
  signIn$: Observable<Action> = this.actions$.pipe(
    ofType<SignActions.AutoSignIn>(SignActions.AUTO_SIGN_IN),
    map(action => action.payload),
    mergeMap(payload =>
      forkJoin([this.sign.autoSignIn(payload), this.translate.get('Sign.in.success'), this.translate.get('Sign.in.failure')])
    ),
    map(res => {
      if (res[0].success) {
        this.toast.success(res[1]);
        return new SignActions.AutoSignInSuccess(res[0]);
      } else {
        this.toast.error(res[2]);
        this.router.navigateByUrl('/main');
        return new SignActions.AutoSignInFailure(undefined);
      }
    }),
    catchError(err => of(new SignActions.AutoSignInFailure(undefined)))
  );
}

export { AutoSignInEffect };
