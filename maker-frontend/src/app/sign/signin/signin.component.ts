import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../ngrx/models';
import { UserState } from '../../app.state';
import { SignActions } from '../../ngrx/actions';
import { SignIn } from '../../ngrx/actions/sign.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(private store: Store<UserState>) {}

  ngOnInit() {}

  private signIn = (email: HTMLInputElement, password: HTMLInputElement) => {
    this.store.dispatch(new SignIn({ email: email.value, password: password.value }));
    email.value = '';
    password.value = '';
  }
}
