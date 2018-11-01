import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { debounceTime, catchError, tap } from 'rxjs/operators';

import lib from 'src/app/lib';
import { User } from '../../../ngrx/models';
import { SignActions } from '../../../ngrx/actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements AfterViewInit {
  public showEmailError = true;
  public showPasswordError = true;
  @ViewChild('email')
  email: ElementRef<HTMLInputElement>;
  @ViewChild('password')
  password: ElementRef<HTMLInputElement>;

  constructor(private store: Store<User>) {}

  ngAfterViewInit() {
    fromEvent(this.email.nativeElement, 'input')
      .pipe(
        tap(x => (this.showEmailError = true)),
        debounceTime(800)
      )
      .subscribe(data => {
        this.showEmailError = lib.emailRegex.test(this.email.nativeElement.value);
      });

    fromEvent(this.password.nativeElement, 'input')
      .pipe(
        tap(x => (this.showEmailError = true)),
        debounceTime(800)
      )
      .subscribe(data => {
        this.showPasswordError = lib.passwordRegex.test(this.password.nativeElement.value);
      });
  }

  private signIn = (email: HTMLInputElement, password: HTMLInputElement) => {
    this.store.dispatch(new SignActions.SignIn({ email: email.value, password: password.value }));
    email.value = '';
    password.value = '';
  }
}
