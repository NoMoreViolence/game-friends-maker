import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, combineLatest } from 'rxjs';
import { debounceTime, catchError, tap, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import lib from '../../../lib';
import { AppState, User } from '../../../ngrx/models';
import { SignActions } from '../../../ngrx/actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements AfterViewInit {
  private eError = true;
  private pError = true;
  @ViewChild('em')
  private email: ElementRef<HTMLInputElement>;
  @ViewChild('pw')
  private password: ElementRef<HTMLInputElement>;
  private user: Observable<User>;

  constructor(private store: Store<AppState>, private router: Router, private translate: TranslateService, private toast: ToastrService) {
    this.user = store.select('user');
  }

  ngAfterViewInit() {
    this.user.pipe(first()).subscribe(userData => {
      if (userData.success === true) {
        combineLatest(this.router.navigateByUrl('/main'), this.translate.get('Sign.in.already'), (uri, translate) => {
          this.toast.info(translate);
        }).subscribe();
      } else {
        fromEvent(this.email.nativeElement, 'input')
          .pipe(
            tap(x => (this.eError = true)),
            debounceTime(600)
          )
          .subscribe(data => {
            if (this.email.nativeElement.value === '') {
              this.eError = true;
            } else {
              this.eError = lib.emailRegex.test(this.email.nativeElement.value);
            }
          });

        fromEvent(this.password.nativeElement, 'input')
          .pipe(
            tap(x => (this.pError = true)),
            debounceTime(600)
          )
          .subscribe(data => {
            if (this.password.nativeElement.value === '') {
              this.pError = true;
            } else {
              this.pError = lib.passwordRegex.test(this.password.nativeElement.value);
            }
          });
      }
    });
  }

  private signIn = (email: HTMLInputElement, password: HTMLInputElement) => {
    if (!this.eError || !this.pError || email.value === '' || password.value === '') {
      this.translate.get('Sign.in.notchecked').subscribe(comment => this.toast.error(comment));
    } else {
      this.store.dispatch(new SignActions.SignIn({ email: email.value, password: password.value }));
    }
  }
}
