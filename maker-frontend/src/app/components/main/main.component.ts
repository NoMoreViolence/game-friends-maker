import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from '../../app.state';
import { User } from '../../ngrx/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public user: Observable<User>;
  constructor(private store: Store<UserState>) {
    this.user = this.store.select('user');
  }

  ngOnInit() {}
}
