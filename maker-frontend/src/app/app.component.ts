import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppState, User } from './store/models';
import { SignActions } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private user: Observable<User>;

  constructor(private translate: TranslateService, private store: Store<AppState>) {
    translate.addLangs(['en', 'kr']);
    translate.setDefaultLang('en');

    this.user = this.store.select('user');
  }

  ngOnInit() {
    this.user.pipe(first()).subscribe(userData => {
      const token = localStorage.getItem('token');
      if (localStorage.getItem('token') !== null) {
        this.store.dispatch(new SignActions.AutoSignIn(localStorage.getItem('token')));
      }
    });
  }
}
